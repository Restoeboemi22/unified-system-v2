import { Injectable } from "@nestjs/common";
import {
  AppHttpError,
  createRemoteHttpError,
  createUpstreamUnavailableError,
  readJsonResponse
} from "@unified/packages-shared-kernel";
import {
  PolicyEvaluateRequest,
  PolicyEvaluateResponseSchema
} from "@unified/packages-policy-contract";

@Injectable()
export class PolicyClient {
  async assertAllowed(
    authorizationHeader: string,
    request: PolicyEvaluateRequest
  ): Promise<void> {
    const baseUrl = process.env.POLICY_SERVICE_BASE_URL ?? "http://localhost:4002";
    let response: Response;
    try {
      response = await fetch(`${baseUrl}/policies/evaluate`, {
        method: "POST",
        headers: {
          authorization: authorizationHeader,
          "content-type": "application/json"
        },
        body: JSON.stringify(request)
      });
    } catch (error) {
      throw createUpstreamUnavailableError("policy-service", error);
    }

    const json = await readJsonResponse(response);

    if (!response.ok) {
      throw createRemoteHttpError(
        response.status,
        json,
        "FORBIDDEN",
        "Policy evaluation gagal"
      );
    }

    const parsed = PolicyEvaluateResponseSchema.safeParse(json);
    if (!parsed.success) {
      throw new AppHttpError(500, "CONFLICT", "Response policy tidak valid");
    }

    if (parsed.data.allowed) {
      return;
    }

    const primaryReason = parsed.data.reasons[0] ?? "missing_capability";
    if (primaryReason === "tenant_scope_violation") {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    if (primaryReason === "service_disabled") {
      throw new AppHttpError(403, "SERVICE_DISABLED", "Service tidak aktif");
    }
    if (primaryReason === "membership_inactive") {
      throw new AppHttpError(403, "MEMBERSHIP_INACTIVE", "Membership tidak aktif");
    }

    throw new AppHttpError(403, "FORBIDDEN", "Capability tidak mencukupi", {
      action: request.action,
      reasons: parsed.data.reasons
    });
  }
}
