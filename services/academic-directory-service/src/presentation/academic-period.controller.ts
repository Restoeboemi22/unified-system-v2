import { Body, Controller, Get, Header, HttpException, Param, Patch, Post, Query, Req } from "@nestjs/common";
import type { Request } from "express";
import {
  CreateAcademicPeriodRequestSchema,
  GetAcademicPeriodResponse,
  ListAcademicPeriodsResponse,
  UpdateAcademicPeriodRequestSchema
} from "@unified/packages-academic-directory-contract";
import { CAPABILITIES } from "@unified/packages-capability-catalog";
import { createApiErrorResponse } from "@unified/packages-shared-kernel";
import { z } from "zod";
import { AcademicPeriodApplicationService } from "../application/academic-period-application.service";
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
export class AcademicPeriodController {
  constructor(
    private readonly app: AcademicPeriodApplicationService,
    private readonly policyClient: PolicyClient
  ) {}

  @Get("/v1/academic-periods")
  @Header("cache-control", "no-store")
  async listAcademicPeriods(
    @Req() req: Request,
    @Query("schoolId") schoolId?: string
  ): Promise<ListAcademicPeriodsResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    return await this.app.listAcademicPeriods(authorization, schoolId);
  }

  @Get("/v1/academic-periods/:academicPeriodId")
  @Header("cache-control", "no-store")
  async getAcademicPeriod(
    @Req() req: Request,
    @Param("academicPeriodId") academicPeriodId: string,
    @Query("schoolId") schoolId?: string
  ): Promise<GetAcademicPeriodResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    return await this.app.getAcademicPeriod(authorization, academicPeriodId, schoolId);
  }

  @Post("/v1/academic-periods")
  async createAcademicPeriod(
    @Req() req: Request,
    @Body() rawBody: unknown
  ): Promise<GetAcademicPeriodResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    const parsed = CreateAcademicPeriodRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.academicPeriodManage,
      resource: { schoolId: parsed.data.schoolId }
    });
    return await this.app.createAcademicPeriod(authorization, parsed.data);
  }

  @Post("/v1/academic-periods/:academicPeriodId/update")
  @Patch("/v1/academic-periods/:academicPeriodId")
  async updateAcademicPeriod(
    @Req() req: Request,
    @Param("academicPeriodId") academicPeriodId: string,
    @Body() rawBody: unknown
  ): Promise<GetAcademicPeriodResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    const parsed = UpdateAcademicPeriodRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.academicPeriodManage,
      resource: {}
    });
    return await this.app.updateAcademicPeriod(authorization, academicPeriodId, parsed.data);
  }
}
