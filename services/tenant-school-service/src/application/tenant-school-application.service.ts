import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { AppHttpError } from "@unified/packages-shared-kernel";
import { createLogger } from "@unified/packages-observability";

const logger = createLogger("tenant-school-application");
import { verifyFirebaseToken } from "../infrastructure/firebase-admin";
import {
  CanonicalSessionPrincipal,
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

@Injectable()
export class TenantSchoolApplicationService {
  constructor(
    private readonly sessionClient: SessionClient,
    private readonly tenantStore: PrismaTenantSchoolStore
  ) {}

  async bootstrapSession(provider: IdentityProvider, idToken: string): Promise<CanonicalSessionPrincipal> {
    // 1. Verifikasi ID Token menggunakan Firebase Admin (atau fallback dummy token untuk dev)
    const identityId = await verifyFirebaseToken(idToken);

    // 2. Dapatkan IdentityAccount dari database
    let identity = await this.tenantStore.getIdentity(provider, identityId);
    if (!identity) {
      if (process.env.NODE_ENV !== "production") {
        logger.info("Auto-registering new developer identity", { provider, identityId });
        const userId = `usr_auto_${identityId.substring(0, 8)}`;
        
        // Buat dummy school jika belum ada
        await this.tenantStore.saveSchool({ schoolId: 'school_dev', name: 'Dev School', status: 'active' });
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
      serviceStatus: serviceStatus.serviceStatus
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
    if (!school) {
      throw new AppHttpError(404, "NOT_FOUND", "School tidak ditemukan");
    }
    const updated = {
      ...school,
      name: request.name ?? school.name,
      status: request.status ?? school.status
    };
    await this.tenantStore.saveSchool(updated);
    await this.writeAuditLog({
      schoolId,
      actorUserId: sessionMe.session.userId,
      action: "school.settings.updated",
      targetType: "school",
      targetId: schoolId,
      payload: JSON.stringify(request)
    });
    return { school: updated };
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
    const activeSchoolId = sessionMe.session.activeSchoolId;
    if (!activeSchoolId || activeSchoolId !== schoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
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
