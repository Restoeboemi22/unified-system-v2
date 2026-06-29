import { Body, Controller, Get, Header, HttpException, Post, Req } from "@nestjs/common";
import { Request } from "express";
import {
  GetSessionMeResponse,
  GetSessionMeResponseSchema,
  LoginSessionRequestSchema,
  LoginSessionResponse,
  RefreshSessionRequestSchema,
  RefreshSessionResponse,
  LogoutSessionRequestSchema,
  SelectTenantRequestSchema,
  SelectTenantResponse
} from "@unified/packages-session-contract";
import { createApiErrorResponse } from "@unified/packages-shared-kernel";
import { z } from "zod";
import { SessionApplicationService } from "../application/session-application.service";

function parseBearerSessionId(req: Request): string | null {
  const header = req.header("authorization");
  if (!header) return null;
  const parts = header.split(" ");
  if (parts.length !== 2) return null;
  if (parts[0].toLowerCase() !== "bearer") return null;
  return parts[1] ?? null;
}

function badRequest(error: z.ZodError): never {
  throw new HttpException(
    createApiErrorResponse("VALIDATION_ERROR", "Request validation error", {
      issues: error.issues
    }),
    400
  );
}

@Controller()
export class SessionController {
  constructor(private readonly sessionApp: SessionApplicationService) {}

  @Post(["/sessions/login", "/v1/sessions/login"])
  async login(@Body() rawBody: unknown): Promise<LoginSessionResponse> {
    const parsed = LoginSessionRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    return await this.sessionApp.login(parsed.data);
  }

  @Post(["/sessions/refresh", "/v1/sessions/refresh"])
  async refresh(@Body() rawBody: unknown): Promise<RefreshSessionResponse> {
    const parsed = RefreshSessionRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    return await this.sessionApp.refresh(parsed.data.sessionId);
  }

  @Post(["/sessions/logout", "/v1/sessions/logout"])
  async logout(@Body() rawBody: unknown) {
    const parsed = LogoutSessionRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.sessionApp.logout(parsed.data.sessionId);
    return { success: true };
  }

  @Get("/sessions/me")
  @Header("cache-control", "no-store")
  async getMe(@Req() req: Request): Promise<GetSessionMeResponse> {
    return await this.handleGetMe(req);
  }

  @Get("/v1/sessions/me")
  @Header("cache-control", "no-store")
  async getMeV1(@Req() req: Request): Promise<GetSessionMeResponse> {
    return await this.handleGetMe(req);
  }

  private async handleGetMe(req: Request): Promise<GetSessionMeResponse> {
    const sessionId = parseBearerSessionId(req);
    if (!sessionId) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    const response = await this.sessionApp.getMe(sessionId);
    const parsed = GetSessionMeResponseSchema.safeParse(response);
    if (!parsed.success) {
      throw new HttpException(
        createApiErrorResponse("CONFLICT", "Invalid response shape"),
        500
      );
    }
    return response;
  }

  @Post(["/sessions/select-tenant", "/v1/sessions/select-tenant"])
  async selectTenant(
    @Req() req: Request,
    @Body() rawBody: unknown
  ): Promise<SelectTenantResponse> {
    const sessionId = parseBearerSessionId(req);
    if (!sessionId) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    const parsed = SelectTenantRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);

    return await this.sessionApp.selectTenant(sessionId, parsed.data.membershipId);
  }
}
