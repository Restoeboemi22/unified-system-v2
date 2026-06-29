import { Body, Controller, Get, Header, HttpException, Param, Patch, Post, Query, Req } from "@nestjs/common";
import type { Request } from "express";
import {
  CreateStaffRequestSchema,
  GetStaffResponse,
  ListStaffsResponse,
  UpdateStaffRequestSchema
} from "@unified/packages-academic-directory-contract";
import { CAPABILITIES } from "@unified/packages-capability-catalog";
import { createApiErrorResponse } from "@unified/packages-shared-kernel";
import { z } from "zod";
import { StaffApplicationService } from "../application/staff-application.service";
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
export class StaffController {
  constructor(
    private readonly app: StaffApplicationService,
    private readonly policyClient: PolicyClient
  ) {}

  @Get("/v1/staffs")
  @Header("cache-control", "no-store")
  async listStaffs(
    @Req() req: Request,
    @Query("schoolId") schoolId?: string
  ): Promise<ListStaffsResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    return await this.app.listStaffs(authorization, schoolId);
  }

  @Get("/v1/staffs/:staffId")
  @Header("cache-control", "no-store")
  async getStaff(
    @Req() req: Request,
    @Param("staffId") staffId: string,
    @Query("schoolId") schoolId?: string
  ): Promise<GetStaffResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    return await this.app.getStaff(authorization, staffId, schoolId);
  }

  @Post("/v1/staffs")
  async createStaff(@Req() req: Request, @Body() rawBody: unknown): Promise<GetStaffResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    const parsed = CreateStaffRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.staffManage,
      resource: { schoolId: parsed.data.schoolId }
    });
    return await this.app.createStaff(authorization, parsed.data);
  }

  @Post("/v1/staffs/:staffId/update")
  @Patch("/v1/staffs/:staffId")
  async updateStaff(
    @Req() req: Request,
    @Param("staffId") staffId: string,
    @Body() rawBody: unknown
  ): Promise<GetStaffResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    const parsed = UpdateStaffRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.staffManage,
      resource: {}
    });
    return await this.app.updateStaff(authorization, staffId, parsed.data);
  }
}
