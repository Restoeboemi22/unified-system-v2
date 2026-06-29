import { describe, it, expect, vi, beforeEach } from "vitest";
import { SessionApplicationService } from "./session-application.service";
import { PrismaSessionStore } from "../infrastructure/prisma-session-store";
import { TenantSchoolClient } from "../infrastructure/tenant-school-client";

describe("SessionApplicationService", () => {
  let service: SessionApplicationService;
  let mockSessionStore: any;
  let mockTenantSchoolClient: any;

  beforeEach(() => {
    mockSessionStore = {
      save: vi.fn(),
      get: vi.fn(),
      delete: vi.fn()
    };
    mockTenantSchoolClient = {
      bootstrapSession: vi.fn(),
      resolveSessionContext: vi.fn()
    };
    service = new SessionApplicationService(
      mockSessionStore as unknown as PrismaSessionStore,
      mockTenantSchoolClient as unknown as TenantSchoolClient
    );
  });

  describe("login", () => {
    it("should process login successfully and return session data", async () => {
      mockTenantSchoolClient.bootstrapSession.mockResolvedValue({
        userId: "usr_123",
        identityId: "idn_123",
        activeMembershipId: "mem_123",
        activeSchoolId: "sch_123",
        activeRole: "admin",
        serviceStatus: "active",
        memberships: []
      });

      const response = await service.login({
        provider: "firebase",
        idToken: "test_token"
      });

      expect(mockTenantSchoolClient.bootstrapSession).toHaveBeenCalledWith("firebase", "test_token");
      expect(mockSessionStore.save).toHaveBeenCalled();
      expect(response.session.sessionId).toMatch(/^sess_/);
      expect(response.session.userId).toBe("usr_123");
      expect(response.session.activeSchoolId).toBe("sch_123");
      expect(response.session.activeRole).toBe("admin");
    });

    it("should throw error if bootstrapSession fails", async () => {
      mockTenantSchoolClient.bootstrapSession.mockRejectedValue(new Error("Invalid token"));

      await expect(service.login({ provider: "firebase", idToken: "bad" })).rejects.toThrow("Invalid token");
      expect(mockSessionStore.save).not.toHaveBeenCalled();
    });
  });
});
