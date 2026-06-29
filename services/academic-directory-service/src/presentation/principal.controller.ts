import { Body, Controller, Get, Header, HttpException, Param, Patch, Post, Query, Req } from "@nestjs/common";
import type { Request } from "express";
import {
  CreatePrincipalRequestSchema,
  GetPrincipalResponse,
  ListPrincipalsResponse,
  UpdatePrincipalRequestSchema
} from "@unified/packages-academic-directory-contract";
import { CAPABILITIES } from "@unified/packages-capability-catalog";
import { createApiErrorResponse } from "@unified/packages-shared-kernel";
import { z } from "zod";
import { PrincipalApplicationService } from "../application/principal-application.service";
import { PolicyClient } from "../infrastructure/policy-client";

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
export class PrincipalController {
  constructor(
    private readonly app: PrincipalApplicationService,
    private readonly policyClient: PolicyClient
  ) {}

  @Get("/v1/principals")
  @Header("cache-control", "no-store")
  async listPrincipals(
    @Req() req: Request,
    @Query("schoolId") schoolId?: string
  ): Promise<ListPrincipalsResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    return await this.app.listPrincipals(authorization, schoolId);
  }

  @Get("/v1/principals/:principalId")
  @Header("cache-control", "no-store")
  async getPrincipal(
    @Req() req: Request,
    @Param("principalId") principalId: string,
    @Query("schoolId") schoolId?: string
  ): Promise<GetPrincipalResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    return await this.app.getPrincipal(authorization, principalId, schoolId);
  }

  @Post("/v1/principals")
  async createPrincipal(
    @Req() req: Request,
    @Body() rawBody: unknown
  ): Promise<GetPrincipalResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    const parsed = CreatePrincipalRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.principalManage,
      resource: { schoolId: parsed.data.schoolId }
    });
    return await this.app.createPrincipal(authorization, parsed.data);
  }

  @Post("/v1/principals/:principalId/update")
  @Patch("/v1/principals/:principalId")
  async updatePrincipal(
    @Req() req: Request,
    @Param("principalId") principalId: string,
    @Body() rawBody: unknown
  ): Promise<GetPrincipalResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    const parsed = UpdatePrincipalRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.principalManage,
      resource: {}
    });
    return await this.app.updatePrincipal(authorization, principalId, parsed.data);
  }
}
