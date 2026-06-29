import { Injectable } from "@nestjs/common";
import {
  AppHttpError,
  createRemoteHttpError,
  createUpstreamUnavailableError,
  readJsonResponse
} from "@unified/packages-shared-kernel";
import {
  CanonicalSessionPrincipal,
  CanonicalSessionPrincipalSchema,
  IdentityProvider,
  InternalSessionContextRequest
} from "@unified/packages-tenant-school-contract";

@Injectable()
export class TenantSchoolClient {
  private readonly baseUrl = process.env.TENANT_SCHOOL_SERVICE_BASE_URL ?? "http://localhost:4003";

  async bootstrapSession(
    provider: IdentityProvider,
    idToken: string
  ): Promise<CanonicalSessionPrincipal> {
    return await this.post("/internal/session-bootstrap", { provider, idToken });
  }

  async resolveSessionContext(
    request: InternalSessionContextRequest
  ): Promise<CanonicalSessionPrincipal> {
    return await this.post("/internal/session-context", request);
  }

  private async post(path: string, body: object): Promise<CanonicalSessionPrincipal> {
    let response: Response;
    try {
      response = await fetch(`${this.baseUrl}${path}`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(body)
      });
    } catch (error) {
      throw createUpstreamUnavailableError("tenant-school-service", error);
    }

    const json = await readJsonResponse(response);
    if (!response.ok) {
      throw createRemoteHttpError(
        response.status,
        json,
        "CONFLICT",
        "tenant-school-service gagal merespons"
      );
    }
    const parsed = CanonicalSessionPrincipalSchema.safeParse(json);
    if (!parsed.success) {
      throw new AppHttpError(500, "CONFLICT", "Response tenant-school-service tidak valid");
    }
    return parsed.data;
  }
}
