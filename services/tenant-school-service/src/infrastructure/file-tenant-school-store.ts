import { Injectable } from "@nestjs/common";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
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

type PersistedTenantSchoolState = {
  schools: SchoolRecord[];
  serviceStatuses: ServiceStatusRecord[];
  memberships: MembershipRecord[];
  identityAccounts: IdentityAccountRecord[];
};

function createDefaultState(): PersistedTenantSchoolState {
  const now = new Date().toISOString();

  return {
    schools: [
      {
        schoolId: "school_001",
        name: "Demo School",
        status: "active"
      }
    ],
    serviceStatuses: [
      {
        schoolId: "school_001",
        serviceStatus: "active",
        reasonCode: null,
        reasonText: null,
        updatedAt: now
      }
    ],
    memberships: [
      {
        membershipId: "mem_student_demo",
        userId: "usr_student_demo",
        identityId: "idn_student_demo",
        schoolId: "school_001",
        role: "student",
        status: "active"
      },
      {
        membershipId: "mem_admin_demo",
        userId: "usr_admin_demo",
        identityId: "idn_admin_demo",
        schoolId: "school_001",
        role: "admin",
        status: "active"
      }
    ],
    identityAccounts: [
      {
        provider: "firebase",
        idToken: "TOKEN_DARI_PROVIDER",
        userId: "usr_student_demo",
        identityId: "idn_student_demo"
      },
      {
        provider: "firebase",
        idToken: "ADMIN_TOKEN",
        userId: "usr_admin_demo",
        identityId: "idn_admin_demo"
      }
    ]
  };
}

@Injectable()
export class FileTenantSchoolStore {
  private readonly filePath =
    process.env.TENANT_SCHOOL_STORE_FILE ??
    resolve(process.cwd(), ".data", "tenant-school-store.json");

  getSchool(schoolId: string): SchoolRecord | undefined {
    return this.readState().schools.find((item) => item.schoolId === schoolId);
  }

  getServiceStatus(schoolId: string): ServiceStatusRecord | undefined {
    return this.readState().serviceStatuses.find((item) => item.schoolId === schoolId);
  }

  saveServiceStatus(serviceStatus: ServiceStatusRecord): void {
    const state = this.readState();
    const nextItems = state.serviceStatuses.filter(
      (item) => item.schoolId !== serviceStatus.schoolId
    );
    nextItems.push(serviceStatus);
    this.writeState({
      ...state,
      serviceStatuses: nextItems
    });
  }

  getIdentity(provider: IdentityProvider, idToken: string): IdentityAccountRecord | undefined {
    return this.readState().identityAccounts.find(
      (item) => item.provider === provider && item.idToken === idToken
    );
  }

  getMembershipsByUserId(userId: string): MembershipRecord[] {
    return this.readState().memberships.filter((item) => item.userId === userId);
  }

  getMembershipById(membershipId: string): MembershipRecord | undefined {
    return this.readState().memberships.find((item) => item.membershipId === membershipId);
  }

  private readState(): PersistedTenantSchoolState {
    this.ensureFile();
    const raw = readFileSync(this.filePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<PersistedTenantSchoolState>;

    return {
      schools: Array.isArray(parsed.schools) ? parsed.schools : [],
      serviceStatuses: Array.isArray(parsed.serviceStatuses) ? parsed.serviceStatuses : [],
      memberships: Array.isArray(parsed.memberships) ? parsed.memberships : [],
      identityAccounts: Array.isArray(parsed.identityAccounts) ? parsed.identityAccounts : []
    };
  }

  private writeState(state: PersistedTenantSchoolState): void {
    this.ensureFile();
    writeFileSync(this.filePath, JSON.stringify(state, null, 2), "utf8");
  }

  private ensureFile(): void {
    const folder = dirname(this.filePath);
    if (!existsSync(folder)) {
      mkdirSync(folder, { recursive: true });
    }
    if (!existsSync(this.filePath)) {
      writeFileSync(this.filePath, JSON.stringify(createDefaultState(), null, 2), "utf8");
    }
  }
}
