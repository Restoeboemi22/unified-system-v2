import { Body, Controller, Get, Header, HttpException, Post, Req } from "@nestjs/common";
import { Request } from "express";
import {
  PolicyCapabilitiesResponse,
  PolicyEvaluateRequestSchema,
  PolicyEvaluateResponse,
  PolicyMeResponse
} from "@unified/packages-policy-contract";
import { createApiErrorResponse } from "@unified/packages-shared-kernel";
import { z } from "zod";
import { PolicyApplicationService } from "../application/policy-application.service";

function parseAuthorizationHeader(req: Request): string | null {
  const header = req.header("authorization");
  if (!header) return null;
  return header;
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
export class PolicyController {
  constructor(private readonly policyApp: PolicyApplicationService) {}

  @Get("/policies/me")
  @Header("cache-control", "no-store")
  async getMe(@Req() req: Request): Promise<PolicyMeResponse> {
    return await this.handleGetMe(req);
  }

  @Get("/v1/policies/me")
  @Header("cache-control", "no-store")
  async getMeV1(@Req() req: Request): Promise<PolicyMeResponse> {
    return await this.handleGetMe(req);
  }

  private async handleGetMe(req: Request): Promise<PolicyMeResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    return await this.policyApp.getMe(authorization);
  }

  @Get("/policies/capabilities")
  @Header("cache-control", "no-store")
  async getCapabilities(@Req() req: Request): Promise<PolicyCapabilitiesResponse> {
    return await this.handleGetCapabilities(req);
  }

  @Get("/v1/policies/capabilities")
  @Header("cache-control", "no-store")
  async getCapabilitiesV1(@Req() req: Request): Promise<PolicyCapabilitiesResponse> {
    return await this.handleGetCapabilities(req);
  }

  private async handleGetCapabilities(req: Request): Promise<PolicyCapabilitiesResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    return await this.policyApp.getCapabilities(authorization);
  }

  @Post("/policies/evaluate")
  @Post("/v1/policies/evaluate")
  async evaluate(@Req() req: Request, @Body() rawBody: unknown): Promise<PolicyEvaluateResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }

    const parsed = PolicyEvaluateRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    const result = await this.policyApp.evaluate(
      authorization,
      parsed.data
    );
    return result;
  }
}
