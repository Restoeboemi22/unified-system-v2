import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { IdentityProvider } from "@unified/packages-tenant-school-contract";

export type SchoolRecord = {
  schoolId: string;
  name: string;
  status: "active" | "inactive";
};

export type MembershipRecord = {
  membershipId: string;
  userId: string;
  identityId: string;
  schoolId: string;
  role: string;
  status: "active" | "inactive" | "suspended";
};

export type IdentityAccountRecord = {
  provider: IdentityProvider;
  idToken: string;
  userId: string;
  identityId: string;
};

export type ServiceStatusRecord = {
  schoolId: string;
  serviceStatus: "active" | "limited" | "disabled";
  reasonCode?: string | null;
  reasonText?: string | null;
  updatedAt: string;
};

export type AuditLogRecord = {
  auditLogId: string;
  schoolId: string;
  actorUserId: string;
  action: string;
  targetType: string;
  targetId: string;
  payload: string;
  createdAt: string;
};

@Injectable()
export class PrismaTenantSchoolStore {
  constructor(private readonly prisma: PrismaService) {}

  async getSchool(schoolId: string): Promise<SchoolRecord | undefined> {
    const school = await this.prisma.school.findUnique({
      where: { schoolId },
    });
    if (!school) return undefined;
    return {
      schoolId: school.schoolId,
      name: school.name,
      status: school.status as any,
    };
  }

  async getSchools(): Promise<SchoolRecord[]> {
    const schools = await this.prisma.school.findMany({
      orderBy: { name: 'asc' }
    });
    return schools.map(school => ({
      schoolId: school.schoolId,
      name: school.name,
      status: school.status as any,
    }));
  }

  async saveSchool(school: SchoolRecord): Promise<void> {
    await this.prisma.school.upsert({
      where: { schoolId: school.schoolId },
      update: {
        name: school.name,
        status: school.status
      },
      create: {
        schoolId: school.schoolId,
        name: school.name,
        status: school.status
      }
    });
  }

  async getServiceStatus(schoolId: string): Promise<ServiceStatusRecord | undefined> {
    const status = await this.prisma.serviceStatus.findUnique({
      where: { schoolId },
    });
    if (!status) return undefined;
    return {
      schoolId: status.schoolId,
      serviceStatus: status.serviceStatus as any,
      reasonCode: status.reasonCode,
      reasonText: status.reasonText,
      updatedAt: status.updatedAt.toISOString(),
    };
  }

  async saveServiceStatus(serviceStatus: ServiceStatusRecord): Promise<void> {
    await this.prisma.serviceStatus.upsert({
      where: { schoolId: serviceStatus.schoolId },
      update: {
        serviceStatus: serviceStatus.serviceStatus,
        reasonCode: serviceStatus.reasonCode,
        reasonText: serviceStatus.reasonText,
        updatedAt: new Date(serviceStatus.updatedAt),
      },
      create: {
        schoolId: serviceStatus.schoolId,
        serviceStatus: serviceStatus.serviceStatus,
        reasonCode: serviceStatus.reasonCode,
        reasonText: serviceStatus.reasonText,
        updatedAt: new Date(serviceStatus.updatedAt),
      },
    });
  }

  async getIdentity(provider: IdentityProvider, identityId: string): Promise<IdentityAccountRecord | undefined> {
    const account = await this.prisma.identityAccount.findFirst({
      where: {
        provider,
        identityId,
      },
    });
    if (!account) return undefined;
    return {
      provider: account.provider as IdentityProvider,
      idToken: account.idToken,
      userId: account.userId,
      identityId: account.identityId,
    };
  }

  async createIdentityAccount(account: IdentityAccountRecord): Promise<void> {
    await this.prisma.identityAccount.create({
      data: {
        provider: account.provider,
        idToken: account.idToken,
        userId: account.userId,
        identityId: account.identityId,
      }
    });
  }

  async getMembershipsByUserId(userId: string): Promise<MembershipRecord[]> {
    const memberships = await this.prisma.membership.findMany({
      where: { userId },
    });
    return memberships.map(m => ({
      membershipId: m.membershipId,
      userId: m.userId,
      identityId: m.identityId,
      schoolId: m.schoolId,
      role: m.role,
      status: m.status as any,
    }));
  }

  async createMembership(membership: MembershipRecord): Promise<void> {
    await this.prisma.membership.create({
      data: {
        membershipId: membership.membershipId,
        userId: membership.userId,
        identityId: membership.identityId,
        schoolId: membership.schoolId,
        role: membership.role,
        status: membership.status
      }
    });
  }

  async getMembershipById(membershipId: string): Promise<MembershipRecord | undefined> {
    const m = await this.prisma.membership.findUnique({
      where: { membershipId },
    });
    if (!m) return undefined;
    return {
      membershipId: m.membershipId,
      userId: m.userId,
      identityId: m.identityId,
      schoolId: m.schoolId,
      role: m.role,
      status: m.status as any,
    };
  }

  async saveMembership(membership: MembershipRecord): Promise<void> {
    await this.prisma.membership.update({
      where: { membershipId: membership.membershipId },
      data: {
        userId: membership.userId,
        identityId: membership.identityId,
        schoolId: membership.schoolId,
        role: membership.role,
        status: membership.status
      }
    });
  }

  async saveAuditLog(auditLog: AuditLogRecord): Promise<void> {
    await this.prisma.auditLog.create({
      data: {
        auditLogId: auditLog.auditLogId,
        schoolId: auditLog.schoolId,
        actorUserId: auditLog.actorUserId,
        action: auditLog.action,
        targetType: auditLog.targetType,
        targetId: auditLog.targetId,
        payload: auditLog.payload,
        createdAt: new Date(auditLog.createdAt)
      }
    });
  }
}
