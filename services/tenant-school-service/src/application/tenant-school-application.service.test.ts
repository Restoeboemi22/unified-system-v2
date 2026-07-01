import { describe, it, expect, vi, beforeEach } from "vitest";
import { TenantSchoolApplicationService } from "./tenant-school-application.service";
import { PrismaTenantSchoolStore } from "../infrastructure/prisma-tenant-school-store";
import { SessionClient } from "../infrastructure/session-client";

// Mock firebase admin
vi.mock("../infrastructure/firebase-admin", () => ({
  verifyFirebaseToken: vi.fn().mockResolvedValue("mocked_identity_id")
}));

// Mock process.env
const originalEnv = process.env;
beforeEach(() => {
  vi.resetModules();
  process.env = { ...originalEnv };
  vi.clearAllMocks();
});

describe("TenantSchoolApplicationService", () => {
  let service: TenantSchoolApplicationService;
  let mockSessionClient: any;
  let mockTenantStore: any;

  beforeEach(() => {
    mockSessionClient = {};
    mockTenantStore = {
      getIdentity: vi.fn(),
      saveSchool: vi.fn(),
      saveServiceStatus: vi.fn(),
      createIdentityAccount: vi.fn(),
      createMembership: vi.fn(),
      getMembershipsByUserId: vi.fn(),
      getServiceStatus: vi.fn(),
      getSchool: vi.fn(),
      saveAuditLog: vi.fn()
    };
    service = new TenantSchoolApplicationService(
      mockSessionClient as unknown as SessionClient,
      mockTenantStore as unknown as PrismaTenantSchoolStore
    );
  });

  describe("bootstrapSession", () => {
    it("should auto-register new developer identity if identity not found in dev mode", async () => {
      process.env.NODE_ENV = "development";
      
      mockTenantStore.getIdentity.mockResolvedValue(null);
      mockTenantStore.getMembershipsByUserId.mockResolvedValue([{
        membershipId: "mem_usr_auto_mocked_i",
        userId: "usr_auto_mocked_i",
        identityId: "mocked_identity_id",
        schoolId: "school_dev",
        role: "super_admin",
        status: "active"
      }]);
      mockTenantStore.getServiceStatus.mockResolvedValue({
        serviceStatus: "active"
      });

      const result = await service.bootstrapSession("firebase", "dummy_token");

      expect(mockTenantStore.getIdentity).toHaveBeenCalledWith("firebase", "mocked_identity_id");
      expect(mockTenantStore.saveSchool).toHaveBeenCalledWith(
        expect.objectContaining({
          schoolId: "school_dev",
          name: "Dev School",
          status: "active"
        })
      );
      expect(mockTenantStore.createIdentityAccount).toHaveBeenCalledWith({
        provider: "firebase",
        idToken: "dummy_token",
        userId: "usr_auto_mocked_i",
        identityId: "mocked_identity_id"
      });
      expect(mockTenantStore.createMembership).toHaveBeenCalled();
      
      expect(result.userId).toBe("usr_auto_mocked_i");
      expect(result.activeRole).toBe("super_admin");
    });

    it("should throw error if identity not found in production mode", async () => {
      process.env.NODE_ENV = "production";
      mockTenantStore.getIdentity.mockResolvedValue(null);

      await expect(service.bootstrapSession("firebase", "dummy_token")).rejects.toThrow(/Identity tidak dikenali/);
    });

    it("should resolve context if identity exists", async () => {
      mockTenantStore.getIdentity.mockResolvedValue({
        userId: "existing_user_id"
      });
      mockTenantStore.getMembershipsByUserId.mockResolvedValue([{
        membershipId: "mem_1",
        userId: "existing_user_id",
        identityId: "mocked_identity_id",
        schoolId: "school_1",
        role: "admin",
        status: "active"
      }]);
      mockTenantStore.getServiceStatus.mockResolvedValue({
        serviceStatus: "active"
      });

      const result = await service.bootstrapSession("firebase", "dummy_token");
      expect(result.userId).toBe("existing_user_id");
      expect(result.activeRole).toBe("admin");
    });
  });

  describe("updateSchoolSettings", () => {
    it("should create and sync service status when school settings are updated", async () => {
      mockSessionClient.getSessionMe = vi.fn().mockResolvedValue({
        session: {
          userId: "usr_super_admin_demo",
          activeRole: "super_admin",
          activeSchoolId: "smpn_3_pacet"
        }
      });

      mockTenantStore.getSchool.mockResolvedValue(undefined);
      mockTenantStore.getServiceStatus.mockResolvedValue(undefined);

      const result = await service.updateSchoolSettings("Bearer session-id", "smpn_1_bangsal", {
        name: "SMPN 1 BANGSAL",
        status: "inactive",
        district: "Bangsal",
        npsn: "20502642"
      });

      expect(mockTenantStore.saveSchool).toHaveBeenCalledWith(
        expect.objectContaining({
          schoolId: "smpn_1_bangsal",
          name: "SMPN 1 BANGSAL",
          status: "inactive",
          district: "Bangsal",
          npsn: "20502642"
        })
      );

      expect(mockTenantStore.saveServiceStatus).toHaveBeenCalledWith(
        expect.objectContaining({
          schoolId: "smpn_1_bangsal",
          serviceStatus: "disabled",
          reasonCode: "tenant_closed"
        })
      );

      expect(result.school.schoolId).toBe("smpn_1_bangsal");
      expect(result.school.status).toBe("inactive");
    });
  });
});
