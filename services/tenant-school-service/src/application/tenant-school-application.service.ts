import { Injectable } from "@nestjs/common";
import { createHash, randomUUID } from "node:crypto";
import { AppHttpError } from "@unified/packages-shared-kernel";
import { createLogger } from "@unified/packages-observability";

const logger = createLogger("tenant-school-application");
import { verifyFirebaseToken } from "../infrastructure/firebase-admin";
import {
  CanonicalSessionPrincipal,
  ChangeSchoolAdminPasswordRequest,
  CreateMembershipRequest,
  GetMembershipResponse,
  GetMyMembershipsResponse,
  GetSchoolResponse,
  GetSchoolsResponse,
  GetSchoolServiceStatusResponse,
  GetUserMembershipsResponse,
  IdentityProvider,
  MembershipDto,
  PatchSchoolServiceStatusRequest,
  PatchMembershipRequest,
  UpdateSchoolSettingsRequest
} from "@unified/packages-tenant-school-contract";
import {
  AuditLogRecord,
  PrismaTenantSchoolStore,
  MembershipRecord
} from "../infrastructure/prisma-tenant-school-store";
import { SessionClient } from "../infrastructure/session-client";

const DEFAULT_SCHOOL_ADMIN_PASSWORD = "admin123";
const SCHOOL_ADMIN_TOKEN_PREFIX = "NPSN_ADMIN::";

function hashSchoolAdminPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

function parseSchoolAdminToken(idToken: string): { npsn: string; password: string } | null {
  if (!idToken.startsWith(SCHOOL_ADMIN_TOKEN_PREFIX)) {
    return null;
  }
  const payload = idToken.slice(SCHOOL_ADMIN_TOKEN_PREFIX.length);
  const separatorIndex = payload.indexOf("::");
  if (separatorIndex < 0) {
    return null;
  }
  const npsn = payload.slice(0, separatorIndex).trim();
  const password = payload.slice(separatorIndex + 2);
  if (!npsn || !password) {
    return null;
  }
  return { npsn, password };
}

@Injectable()
export class TenantSchoolApplicationService {
  constructor(
    private readonly sessionClient: SessionClient,
    private readonly tenantStore: PrismaTenantSchoolStore
  ) {}

  async bootstrapSession(provider: IdentityProvider, idToken: string): Promise<CanonicalSessionPrincipal> {
    const schoolAdminAttempt = parseSchoolAdminToken(idToken);
    if (schoolAdminAttempt) {
      return this.bootstrapSchoolAdminSession(provider, schoolAdminAttempt.npsn, schoolAdminAttempt.password);
    }

    // 1. Verifikasi ID Token menggunakan Firebase Admin (atau fallback dummy token untuk dev)
    const identityId = await verifyFirebaseToken(idToken);

    // 2. Dapatkan IdentityAccount dari database
    let identity = await this.tenantStore.getIdentity(provider, identityId);
    if (!identity) {
      if (process.env.NODE_ENV !== "production") {
        logger.info("Auto-registering new developer identity", { provider, identityId });
        const userId = `usr_auto_${identityId.substring(0, 8)}`;
        
        // Buat dummy school jika belum ada
        await this.tenantStore.saveSchool({
          schoolId: 'school_dev',
          name: 'Dev School',
          status: 'active',
          adminAccessActive: true,
          adminMustChangePassword: false,
          latitude: null,
          longitude: null
        });
        await this.tenantStore.saveServiceStatus({
          schoolId: 'school_dev',
          serviceStatus: 'active',
          reasonCode: null,
          reasonText: null,
          updatedAt: new Date().toISOString()
        });
        
        // Daftarkan identity baru
        identity = { provider, idToken, userId, identityId };
        await this.tenantStore.createIdentityAccount(identity);
        
        // Daftarkan membership baru berdasarkan tipe identityId
        const role = identityId === "idn_super_admin_demo" ? "super_admin" : 
                     identityId === "idn_admin_demo" ? "admin" : 
                     identityId === "idn_student_demo" ? "student" : "super_admin";
                     
        await this.tenantStore.createMembership({
          membershipId: `mem_${userId}`,
          userId,
          identityId,
          schoolId: 'school_dev',
          role,
          status: 'active'
        });
        
      } else {
        throw new AppHttpError(401, "UNAUTHENTICATED", "Identity tidak dikenali");
      }
    }
    return this.resolveSessionContext(identity.userId);
  }

  async resolveSessionContext(
    userId: string,
    activeMembershipId?: string | null
  ): Promise<CanonicalSessionPrincipal> {
    const memberships = await this.getMembershipsByUserId(userId);
    if (memberships.length === 0) {
      throw new AppHttpError(403, "MEMBERSHIP_INACTIVE", "User tidak memiliki membership");
    }

    const resolvedMembership =
      activeMembershipId === undefined || activeMembershipId === null
        ? memberships.find((item) => item.status === "active")
        : memberships.find((item) => item.membershipId === activeMembershipId);

    if (!resolvedMembership) {
      throw new AppHttpError(404, "NOT_FOUND", "Membership tidak ditemukan");
    }

    if (resolvedMembership.userId !== userId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Membership di luar scope user");
    }

    if (resolvedMembership.status !== "active") {
      throw new AppHttpError(
        403,
        "MEMBERSHIP_INACTIVE",
        "Membership tidak aktif",
        { membershipId: resolvedMembership.membershipId }
      );
    }

    const serviceStatus = await this.tenantStore.getServiceStatus(resolvedMembership.schoolId);
    if (!serviceStatus) {
      throw new AppHttpError(404, "NOT_FOUND", "Service status tidak ditemukan");
    }

    const requiresPasswordChange = await this.resolvePasswordChangeRequirement(
      resolvedMembership.role,
      resolvedMembership.identityId,
      resolvedMembership.schoolId
    );

    return {
      userId: resolvedMembership.userId,
      identityId: resolvedMembership.identityId,
      memberships: memberships.map((item) => ({
        membershipId: item.membershipId,
        schoolId: item.schoolId,
        role: item.role,
        status: item.status
      })),
      activeMembershipId: resolvedMembership.membershipId,
      activeSchoolId: resolvedMembership.schoolId,
      activeRole: resolvedMembership.role,
      serviceStatus: serviceStatus.serviceStatus,
      requiresPasswordChange
    };
  }

  async getSchool(
    authorizationHeader: string,
    schoolId: string
  ): Promise<GetSchoolResponse> {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    this.assertTenantScopeFromSession(sessionMe, schoolId);
    const school = await this.tenantStore.getSchool(schoolId);
    if (!school) {
      throw new AppHttpError(404, "NOT_FOUND", "School tidak ditemukan");
    }
    return { school };
  }

  async getSchools(authorizationHeader: string): Promise<GetSchoolsResponse> {
    await this.getSessionMe(authorizationHeader);
    const schools = await this.tenantStore.getSchools();
    return { schools };
  }

  async updateSchoolSettings(
    authorizationHeader: string,
    schoolId: string,
    request: UpdateSchoolSettingsRequest
  ): Promise<GetSchoolResponse> {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    this.assertTenantScopeFromSession(sessionMe, schoolId);
    const school = await this.tenantStore.getSchool(schoolId);
    const updated = {
      schoolId,
      name: request.name ?? school?.name ?? schoolId,
      status: request.status ?? school?.status ?? "active",
      district: request.district ?? school?.district ?? null,
      npsn: request.npsn ?? school?.npsn ?? null,
      authEmail: request.authEmail ?? school?.authEmail ?? null,
      adminEmail: request.adminEmail ?? school?.adminEmail ?? null,
      backupEmail: request.backupEmail ?? school?.backupEmail ?? null,
      adminAccessActive: request.adminAccessActive ?? school?.adminAccessActive ?? true,
      adminPasswordHash: school?.adminPasswordHash ?? hashSchoolAdminPassword(DEFAULT_SCHOOL_ADMIN_PASSWORD),
      adminMustChangePassword: school?.adminMustChangePassword ?? true,
      adminLastLoginAt: school?.adminLastLoginAt ?? null,
      adminPasswordChangedAt: school?.adminPasswordChangedAt ?? null,
      latitude: request.latitude ?? school?.latitude ?? null,
      longitude: request.longitude ?? school?.longitude ?? null
    };
    await this.tenantStore.saveSchool(updated);
    await this.syncServiceStatusWithSchool(updated, await this.tenantStore.getServiceStatus(schoolId));
    await this.writeAuditLog({
      schoolId,
      actorUserId: sessionMe.session.userId,
      action: school ? "school.settings.updated" : "school.created",
      targetType: "school",
      targetId: schoolId,
      payload: JSON.stringify(request)
    });
    return { school: updated };
  }

  async changeSchoolAdminPassword(
    authorizationHeader: string,
    schoolId: string,
    request: ChangeSchoolAdminPasswordRequest
  ): Promise<{ success: true }> {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    this.assertTenantScopeFromSession(sessionMe, schoolId);
    if (!["admin", "super_admin"].includes(String(sessionMe.session.activeRole || ""))) {
      throw new AppHttpError(403, "FORBIDDEN", "Role tidak diizinkan mengubah password admin sekolah");
    }

    const school = await this.tenantStore.getSchool(schoolId);
    if (!school) {
      throw new AppHttpError(404, "NOT_FOUND", "School tidak ditemukan");
    }

    const now = new Date().toISOString();
    await this.tenantStore.saveSchool({
      ...school,
      adminPasswordHash: hashSchoolAdminPassword(request.newPassword),
      adminMustChangePassword: false,
      adminPasswordChangedAt: now
    });
    await this.writeAuditLog({
      schoolId,
      actorUserId: sessionMe.session.userId,
      action: "school_admin.password_changed",
      targetType: "school_admin",
      targetId: schoolId,
      payload: JSON.stringify({ changedByRole: sessionMe.session.activeRole })
    });
    return { success: true };
  }

  async getServiceStatus(
    authorizationHeader: string,
    schoolId: string
  ): Promise<GetSchoolServiceStatusResponse> {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    this.assertTenantScopeFromSession(sessionMe, schoolId);
    const status = await this.tenantStore.getServiceStatus(schoolId);
    if (!status) {
      throw new AppHttpError(404, "NOT_FOUND", "Service status tidak ditemukan");
    }
    return { serviceStatus: status };
  }

  async patchServiceStatus(
    authorizationHeader: string,
    schoolId: string,
    request: PatchSchoolServiceStatusRequest
  ): Promise<GetSchoolServiceStatusResponse> {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    this.assertTenantScopeFromSession(sessionMe, schoolId);
    const existing = await this.tenantStore.getServiceStatus(schoolId);
    if (!existing) {
      throw new AppHttpError(404, "NOT_FOUND", "Service status tidak ditemukan");
    }
    const next = {
      ...existing,
      serviceStatus: request.serviceStatus,
      reasonCode: request.reasonCode ?? null,
      reasonText: request.reasonText ?? null,
      updatedAt: new Date().toISOString()
    };
    await this.tenantStore.saveServiceStatus(next);
    await this.writeAuditLog({
      schoolId,
      actorUserId: sessionMe.session.userId,
      action: "school.service_status.changed",
      targetType: "service_status",
      targetId: schoolId,
      payload: JSON.stringify(request)
    });
    return { serviceStatus: next };
  }

  async getMyMemberships(authorizationHeader: string): Promise<GetMyMembershipsResponse> {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    const memberships = await this.getMembershipsByUserId(sessionMe.session.userId);
    return {
      memberships: memberships.map((item) => this.mapMembership(item))
    };
  }

  async getUserMemberships(
    authorizationHeader: string,
    userId: string
  ): Promise<GetUserMembershipsResponse> {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    const activeSchoolId = sessionMe.session.activeSchoolId;
    if (!activeSchoolId) {
      throw new AppHttpError(409, "CONFLICT", "Tenant belum dipilih");
    }
    const memberships = await this.getMembershipsByUserId(userId);
    return {
      memberships: memberships
        .filter((item) => item.schoolId === activeSchoolId)
        .map((item) => this.mapMembership(item))
    };
  }

  async createMembership(
    authorizationHeader: string,
    request: CreateMembershipRequest
  ): Promise<GetMembershipResponse> {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    this.assertTenantScopeFromSession(sessionMe, request.schoolId);
    const school = await this.tenantStore.getSchool(request.schoolId);
    if (!school) {
      throw new AppHttpError(404, "NOT_FOUND", "School tidak ditemukan");
    }
    const existing = (await this.getMembershipsByUserId(request.userId)).find(
      (item) => item.schoolId === request.schoolId && item.role === request.role
    );
    if (existing) {
      throw new AppHttpError(409, "CONFLICT", "Membership identik sudah ada");
    }
    const membership: MembershipRecord = {
      membershipId: `mem_${randomUUID()}`,
      userId: request.userId,
      identityId: request.identityId,
      schoolId: request.schoolId,
      role: request.role,
      status: request.status
    };
    await this.tenantStore.createMembership(membership);
    await this.writeAuditLog({
      schoolId: request.schoolId,
      actorUserId: sessionMe.session.userId,
      action: "membership.created",
      targetType: "membership",
      targetId: membership.membershipId,
      payload: JSON.stringify(request)
    });
    return { membership: this.mapMembership(membership) };
  }

  async patchMembership(
    authorizationHeader: string,
    membershipId: string,
    request: PatchMembershipRequest
  ): Promise<GetMembershipResponse> {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    const membership = await this.tenantStore.getMembershipById(membershipId);
    if (!membership) {
      throw new AppHttpError(404, "NOT_FOUND", "Membership tidak ditemukan");
    }
    this.assertTenantScopeFromSession(sessionMe, membership.schoolId);
    const updated: MembershipRecord = {
      ...membership,
      role: request.role ?? membership.role,
      status: request.status ?? membership.status
    };
    await this.tenantStore.saveMembership(updated);
    await this.writeAuditLog({
      schoolId: updated.schoolId,
      actorUserId: sessionMe.session.userId,
      action: "membership.updated",
      targetType: "membership",
      targetId: membershipId,
      payload: JSON.stringify(request)
    });
    return { membership: this.mapMembership(updated) };
  }

  async activateMembership(
    authorizationHeader: string,
    membershipId: string
  ): Promise<GetMembershipResponse> {
    return this.changeMembershipStatus(authorizationHeader, membershipId, "active", "membership.activated");
  }

  async suspendMembership(
    authorizationHeader: string,
    membershipId: string
  ): Promise<GetMembershipResponse> {
    return this.changeMembershipStatus(authorizationHeader, membershipId, "suspended", "membership.suspended");
  }

  private async getMembershipsByUserId(userId: string): Promise<MembershipRecord[]> {
    return this.tenantStore.getMembershipsByUserId(userId);
  }

  private async bootstrapSchoolAdminSession(
    provider: IdentityProvider,
    rawNpsn: string,
    password: string
  ): Promise<CanonicalSessionPrincipal> {
    const npsn = rawNpsn.trim();
    const school = await this.tenantStore.getSchoolByNpsn(npsn);
    if (!school) {
      throw new AppHttpError(401, "UNAUTHENTICATED", "NPSN tidak dikenali");
    }
    if (school.status !== "active") {
      throw new AppHttpError(403, "FORBIDDEN", "Tenant sekolah sedang tidak aktif");
    }
    if (school.adminAccessActive === false) {
      throw new AppHttpError(403, "FORBIDDEN", "Login admin sekolah sedang ditutup oleh super admin");
    }

    const expectedHash = school.adminPasswordHash ?? hashSchoolAdminPassword(DEFAULT_SCHOOL_ADMIN_PASSWORD);
    const providedHash = hashSchoolAdminPassword(password);
    if (providedHash !== expectedHash) {
      throw new AppHttpError(401, "UNAUTHENTICATED", "NPSN atau password salah");
    }

    const identityId = `idn_school_admin_${npsn}`;
    const userId = `usr_school_admin_${npsn}`;
    let identity = await this.tenantStore.getIdentity(provider, identityId);
    if (!identity) {
      identity = {
        provider,
        idToken: `school-admin:${npsn}`,
        userId,
        identityId
      };
      await this.tenantStore.createIdentityAccount(identity);
    }

    const memberships = await this.getMembershipsByUserId(identity.userId);
    const existingMembership = memberships.find(
      (item) => item.schoolId === school.schoolId && item.role === "admin"
    );
    if (!existingMembership) {
      await this.tenantStore.createMembership({
        membershipId: `mem_school_admin_${npsn}`,
        userId: identity.userId,
        identityId,
        schoolId: school.schoolId,
        role: "admin",
        status: "active"
      });
    }

    await this.tenantStore.saveSchool({
      ...school,
      adminPasswordHash: school.adminPasswordHash ?? expectedHash,
      adminMustChangePassword: school.adminMustChangePassword,
      adminLastLoginAt: new Date().toISOString()
    });

    return this.resolveSessionContext(identity.userId);
  }

  private async changeMembershipStatus(
    authorizationHeader: string,
    membershipId: string,
    nextStatus: MembershipRecord["status"],
    action: string
  ): Promise<GetMembershipResponse> {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    const membership = await this.tenantStore.getMembershipById(membershipId);
    if (!membership) {
      throw new AppHttpError(404, "NOT_FOUND", "Membership tidak ditemukan");
    }
    this.assertTenantScopeFromSession(sessionMe, membership.schoolId);
    const updated = {
      ...membership,
      status: nextStatus
    };
    await this.tenantStore.saveMembership(updated);
    await this.writeAuditLog({
      schoolId: updated.schoolId,
      actorUserId: sessionMe.session.userId,
      action,
      targetType: "membership",
      targetId: membershipId,
      payload: JSON.stringify({ status: nextStatus })
    });
    return { membership: this.mapMembership(updated) };
  }

  private async getSessionMe(authorizationHeader: string) {
    return this.sessionClient.getSessionMe(authorizationHeader);
  }

  private assertTenantScopeFromSession(sessionMe: Awaited<ReturnType<SessionClient["getSessionMe"]>>, schoolId: string) {
    if (sessionMe.session.activeRole === "super_admin") {
      return;
    }
    const activeSchoolId = sessionMe.session.activeSchoolId;
    if (!activeSchoolId || activeSchoolId !== schoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
  }

  private async resolvePasswordChangeRequirement(
    role: string,
    identityId: string,
    schoolId: string
  ): Promise<boolean> {
    if (role !== "admin" || !identityId.startsWith("idn_school_admin_")) {
      return false;
    }
    const school = await this.tenantStore.getSchool(schoolId);
    return school?.adminMustChangePassword === true;
  }

  private async syncServiceStatusWithSchool(
    school: {
      schoolId: string;
      status: string;
      name: string;
    },
    existingStatus?: {
      schoolId: string;
      serviceStatus: "active" | "limited" | "disabled";
      reasonCode?: string | null;
      reasonText?: string | null;
      updatedAt: string;
    }
  ): Promise<void> {
    const now = new Date().toISOString();
    const nextStatus =
      school.status === "active"
        ? existingStatus?.serviceStatus === "limited"
          ? "limited"
          : "active"
        : "disabled";

    const nextReasonCode =
      school.status === "active"
        ? existingStatus?.serviceStatus === "limited"
          ? existingStatus.reasonCode ?? "manual_limit"
          : existingStatus?.reasonCode === "tenant_closed"
            ? "tenant_opened"
            : existingStatus?.reasonCode ?? null
        : "tenant_closed";

    const nextReasonText =
      school.status === "active"
        ? existingStatus?.serviceStatus === "limited"
          ? existingStatus.reasonText ?? null
          : existingStatus?.reasonCode === "tenant_closed"
            ? `Tenant ${school.name} dibuka kembali dari Database Induk.`
            : existingStatus?.reasonText ?? null
        : `Tenant ${school.name} ditutup dari Database Induk.`;

    await this.tenantStore.saveServiceStatus({
      schoolId: school.schoolId,
      serviceStatus: nextStatus,
      reasonCode: nextReasonCode,
      reasonText: nextReasonText,
      updatedAt: now
    });
  }

  private mapMembership(item: MembershipRecord): MembershipDto {
    return {
      membershipId: item.membershipId,
      userId: item.userId,
      identityId: item.identityId,
      schoolId: item.schoolId,
      role: item.role,
      status: item.status
    };
  }

  private async writeAuditLog(
    input: Omit<AuditLogRecord, "auditLogId" | "createdAt">
  ): Promise<void> {
    const auditLogId = `audit_${randomUUID()}`;
    const createdAt = new Date().toISOString();
    
    await this.tenantStore.saveAuditLog({
      auditLogId,
      createdAt,
      ...input
    });

    logger.info("audit_log_created", {
      auditLogId,
      action: input.action,
      targetType: input.targetType,
      targetId: input.targetId,
      actorUserId: input.actorUserId
    });
  }
}
