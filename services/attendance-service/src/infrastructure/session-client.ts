import { Injectable } from "@nestjs/common";
import { GetSessionMeResponseSchema } from "@unified/packages-session-contract";
import {
  AppHttpError,
  createRemoteHttpError,
  createUpstreamUnavailableError,
  readJsonResponse
} from "@unified/packages-shared-kernel";

@Injectable()
export class SessionClient {
  async getSessionMe(authorizationHeader: string) {
    const baseUrl = process.env.SESSION_SERVICE_BASE_URL ?? "http://localhost:4001";
    let response: Response;
    try {
      response = await fetch(`${baseUrl}/sessions/me`, {
        method: "GET",
        headers: {
          authorization: authorizationHeader
        }
      });
    } catch (error) {
      throw createUpstreamUnavailableError("session-service", error);
    }

    const json = await readJsonResponse(response);
    if (!response.ok) {
      throw createRemoteHttpError(
        response.status,
        json,
        "UNAUTHENTICATED",
        "Session tidak valid"
      );
    }
    const parsed = GetSessionMeResponseSchema.safeParse(json);
    if (!parsed.success) {
      throw new AppHttpError(500, "CONFLICT", "Response session-service tidak valid");
    }
    return parsed.data;
  }
}
