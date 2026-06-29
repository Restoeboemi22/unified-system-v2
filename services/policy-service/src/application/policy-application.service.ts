import { Injectable } from "@nestjs/common";
import { getCapabilitiesForRole } from "@unified/packages-capability-catalog";
import { SessionClient } from "../infrastructure/session-client";
import {
  PolicyCapabilitiesResponse,
  PolicyEvaluateRequest,
  PolicyEvaluateResponse,
  PolicyMeResponse
} from "@unified/packages-policy-contract";
import { createLogger } from "@unified/packages-observability";

const logger = createLogger("policy-application");

@Injectable()
export class PolicyApplicationService {
  constructor(private readonly sessionClient: SessionClient) {}

  async getMe(authorizationHeader: string): Promise<PolicyMeResponse> {
    const sessionMe = await this.sessionClient.getSessionMe(authorizationHeader);
    const capabilities =
      sessionMe.session.serviceStatus === "disabled"
        ? []
        : getCapabilitiesForRole(sessionMe.session.activeRole);

    const deniedReasons =
      sessionMe.session.serviceStatus === "active"
        ? []
        : sessionMe.session.serviceStatus === "limited"
          ? ["service_limited"]
          : ["service_disabled"];

    return {
      activeSchoolId: sessionMe.session.activeSchoolId,
      activeRole: sessionMe.session.activeRole,
      serviceStatus: sessionMe.session.serviceStatus,
      capabilities,
      deniedReasons
    };
  }

  async getCapabilities(authorizationHeader: string): Promise<PolicyCapabilitiesResponse> {
    const me = await this.getMe(authorizationHeader);
    return { capabilities: me.capabilities };
  }

  async evaluate(
    authorizationHeader: string,
    request: PolicyEvaluateRequest
  ): Promise<PolicyEvaluateResponse> {
    const me = await this.getMe(authorizationHeader);

    if (me.serviceStatus === "disabled") {
      logger.warn("policy_denial", { action: request.action, reason: "service_disabled" });
      return { allowed: false, action: request.action, reasons: ["service_disabled"] };
    }

    if (!me.activeSchoolId || !me.activeRole) {
      logger.warn("policy_denial", { action: request.action, reason: "membership_inactive" });
      return { allowed: false, action: request.action, reasons: ["membership_inactive"] };
    }

    const resourceSchoolId =
      typeof request.resource?.["schoolId"] === "string"
        ? (request.resource["schoolId"] as string)
        : null;

    if (resourceSchoolId && resourceSchoolId !== me.activeSchoolId) {
      logger.warn("policy_denial", { action: request.action, reason: "tenant_scope_violation" });
      return {
        allowed: false,
        action: request.action,
        reasons: ["tenant_scope_violation"]
      };
    }

    if (!me.capabilities.includes(request.action)) {
      logger.warn("policy_denial", { action: request.action, reason: "missing_capability" });
      return {
        allowed: false,
        action: request.action,
        reasons: ["missing_capability"]
      };
    }

    return { allowed: true, action: request.action, reasons: [] };
  }
}
