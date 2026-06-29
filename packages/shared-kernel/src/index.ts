import { z } from "zod";

export const ApiErrorCodeSchema = z.enum([
  "UNAUTHENTICATED",
  "FORBIDDEN",
  "TENANT_SCOPE_VIOLATION",
  "SERVICE_DISABLED",
  "MEMBERSHIP_INACTIVE",
  "VALIDATION_ERROR",
  "CONFLICT",
  "NOT_FOUND"
]);

export type ApiErrorCode = z.infer<typeof ApiErrorCodeSchema>;

export const ApiErrorSchema = z.object({
  code: ApiErrorCodeSchema,
  message: z.string(),
  details: z.record(z.unknown()).optional()
});

export type ApiErrorDto = z.infer<typeof ApiErrorSchema>;

export const ApiErrorResponseSchema = z.object({
  error: ApiErrorSchema
});

export type ApiErrorResponseDto = z.infer<typeof ApiErrorResponseSchema>;

export function createApiErrorResponse(
  code: ApiErrorCode,
  message: string,
  details?: Record<string, unknown>
): ApiErrorResponseDto {
  return {
    error: {
      code,
      message,
      details
    }
  };
}

export class AppHttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: ApiErrorCode,
    message: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "AppHttpError";
  }

  toResponse(): ApiErrorResponseDto {
    return createApiErrorResponse(this.code, this.message, this.details);
  }
}

export function parseApiErrorResponse(payload: unknown): ApiErrorResponseDto | null {
  const parsed = ApiErrorResponseSchema.safeParse(payload);
  return parsed.success ? parsed.data : null;
}

export function createRemoteHttpError(
  status: number,
  payload: unknown,
  fallbackCode: ApiErrorCode,
  fallbackMessage: string,
  details?: Record<string, unknown>
): AppHttpError {
  const parsed = parseApiErrorResponse(payload);
  if (parsed) {
    return new AppHttpError(
      status,
      parsed.error.code,
      parsed.error.message,
      parsed.error.details
    );
  }

  return new AppHttpError(status, fallbackCode, fallbackMessage, details);
}

export function createUpstreamUnavailableError(
  upstreamName: string,
  cause: unknown
): AppHttpError {
  const details =
    cause instanceof Error
      ? { upstream: upstreamName, cause: cause.message }
      : { upstream: upstreamName };

  return new AppHttpError(502, "CONFLICT", `${upstreamName} tidak dapat dihubungi`, details);
}

export async function readJsonResponse(response: { text(): Promise<string> }): Promise<unknown> {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}
