import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import {
  GetSessionMeResponse,
  LoginSessionRequest,
  LoginSessionResponse,
  RefreshSessionResponse,
  SelectTenantResponse
} from "@unified/packages-session-contract";
import { getCapabilitiesForRole } from "@unified/packages-capability-catalog";
import { AppHttpError } from "@unified/packages-shared-kernel";
import { createLogger } from "@unified/packages-observability";
import { SessionRecord } from "../domain/session-record";
import { PrismaSessionStore } from "../infrastructure/prisma-session-store";
import { TenantSchoolClient } from "../infrastructure/tenant-school-client";

const logger = createLogger("session-application");

function computeExpiresAt(ttlMinutes: number) {
  return new Date(Date.now() + ttlMinutes * 60_000).toISOString();
}

@Injectable()
export class SessionApplicationService {
  constructor(
    private readonly sessionStore: PrismaSessionStore,
    private readonly tenantSchoolClient: TenantSchoolClient
  ) {}

  async login(request: LoginSessionRequest): Promise<LoginSessionResponse> {
    const ttlMinutes = Number(process.env.DEFAULT_SESSION_TTL_MINUTES ?? "120");
    try {
      const principal = await this.tenantSchoolClient.bootstrapSession(
        request.provider,
        request.idToken
      );
      const sessionId = `sess_${randomUUID()}`;
      const expiresAt = computeExpiresAt(ttlMinutes);

      const record: SessionRecord = {
        sessionId,
        userId: principal.userId,
        identityId: principal.identityId,
        activeMembershipId: principal.activeMembershipId,
        expiresAt
      };

      await this.sessionStore.save(record);
      logger.info("login_success", { userId: principal.userId, provider: request.provider });

      return this.buildSessionResponse(record, principal);
    } catch (error) {
      logger.error("login_failure", { provider: request.provider, error: error instanceof Error ? error.message : "Unknown error" });
      throw error;
    }
  }

  async refresh(sessionId: string): Promise<RefreshSessionResponse> {
    try {
      const ttlMinutes = Number(process.env.DEFAULT_SESSION_TTL_MINUTES ?? "120");
      const record = await this.requireSession(sessionId);
      const principal = await this.tenantSchoolClient.resolveSessionContext({
        userId: record.userId,
        activeMembershipId: record.activeMembershipId
      });
      const expiresAt = computeExpiresAt(ttlMinutes);

      const updated: SessionRecord = { ...record, expiresAt };
      await this.sessionStore.save(updated);

      logger.info("session_refreshed", { userId: updated.userId, sessionId });

      return {
        session: {
          sessionId: updated.sessionId,
          userId: updated.userId,
          identityId: updated.identityId,
          activeSchoolId: principal.activeSchoolId,
          activeRole: principal.activeRole,
          serviceStatus: principal.serviceStatus,
          requiresPasswordChange: principal.requiresPasswordChange ?? false,
          expiresAt
        },
        capabilities: this.computeCapabilities(principal.activeRole, principal.serviceStatus)
      };
    } catch (error) {
      logger.error("session_refresh_failure", { sessionId, error: error instanceof Error ? error.message : "Unknown error" });
      throw error;
    }
  }

  async logout(sessionId: string): Promise<{ success: true }> {
    await this.sessionStore.delete(sessionId);
    logger.info("session_invalidated", { sessionId, reason: "logout" });
    return { success: true };
  }

  async getMe(sessionId: string): Promise<GetSessionMeResponse> {
    const record = await this.requireSession(sessionId);
    const principal = await this.tenantSchoolClient.resolveSessionContext({
      userId: record.userId,
      activeMembershipId: record.activeMembershipId
    });
    return this.buildSessionResponse(record, principal);
  }

  async selectTenant(sessionId: string, membershipId: string): Promise<SelectTenantResponse> {
    const record = await this.requireSession(sessionId);
    const principal = await this.tenantSchoolClient.resolveSessionContext({
      userId: record.userId,
      activeMembershipId: membershipId
    });
    const updated: SessionRecord = { ...record, activeMembershipId: principal.activeMembershipId };
    await this.sessionStore.save(updated);

    return {
      session: {
        sessionId: updated.sessionId,
        userId: updated.userId,
        identityId: updated.identityId,
        activeSchoolId: principal.activeSchoolId,
        activeRole: principal.activeRole,
        serviceStatus: principal.serviceStatus,
          requiresPasswordChange: principal.requiresPasswordChange ?? false,
        expiresAt: updated.expiresAt
      },
      capabilities: this.computeCapabilities(principal.activeRole, principal.serviceStatus)
    };
  }

  private async requireSession(sessionId: string): Promise<SessionRecord> {
    const session = await this.sessionStore.getBySessionId(sessionId);
    if (!session) {
      throw new AppHttpError(401, "UNAUTHENTICATED", "Session tidak valid");
    }
    if (new Date(session.expiresAt).getTime() <= Date.now()) {
      throw new AppHttpError(401, "UNAUTHENTICATED", "Session sudah kedaluwarsa");
    }
    return session;
  }

  private buildSessionResponse(
    record: SessionRecord,
    principal: {
      activeRole: string;
      activeSchoolId: string;
      serviceStatus: "active" | "limited" | "disabled";
      requiresPasswordChange?: boolean;
      memberships: GetSessionMeResponse["memberships"];
    }
  ): GetSessionMeResponse {
    return {
      session: {
        sessionId: record.sessionId,
        userId: record.userId,
        identityId: record.identityId,
        activeSchoolId: principal.activeSchoolId,
        activeRole: principal.activeRole,
        serviceStatus: principal.serviceStatus,
        requiresPasswordChange: principal.requiresPasswordChange ?? false,
        expiresAt: record.expiresAt
      },
      memberships: principal.memberships,
      capabilities: this.computeCapabilities(principal.activeRole, principal.serviceStatus)
    };
  }

  private computeCapabilities(
    activeRole: string | null,
    serviceStatus: "active" | "limited" | "disabled"
  ): string[] {
    if (serviceStatus === "disabled") {
      return [];
    }
    return getCapabilitiesForRole(activeRole);
  }
}
