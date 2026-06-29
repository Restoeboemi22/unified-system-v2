import { Body, Controller, Get, Header, HttpException, Param, Patch, Post, Query, Req } from "@nestjs/common";
import type { Request } from "express";
import {
  CreateTeacherRequestSchema,
  GetTeacherResponse,
  ListTeachersResponse,
  UpdateTeacherRequestSchema
} from "@unified/packages-academic-directory-contract";
import { CAPABILITIES } from "@unified/packages-capability-catalog";
import { createApiErrorResponse } from "@unified/packages-shared-kernel";
import { z } from "zod";
import { TeacherApplicationService } from "../application/teacher-application.service";
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
export class TeacherController {
  constructor(
    private readonly app: TeacherApplicationService,
    private readonly policyClient: PolicyClient
  ) {}

  @Get("/v1/teachers")
  @Header("cache-control", "no-store")
  async listTeachers(
    @Req() req: Request,
    @Query("schoolId") schoolId?: string
  ): Promise<ListTeachersResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    return await this.app.listTeachers(authorization, schoolId);
  }

  @Get("/v1/teachers/:teacherId")
  @Header("cache-control", "no-store")
  async getTeacher(
    @Req() req: Request,
    @Param("teacherId") teacherId: string,
    @Query("schoolId") schoolId?: string
  ): Promise<GetTeacherResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    return await this.app.getTeacher(authorization, teacherId, schoolId);
  }

  @Post("/v1/teachers")
  async createTeacher(@Req() req: Request, @Body() rawBody: unknown): Promise<GetTeacherResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    const parsed = CreateTeacherRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.teacherManage,
      resource: { schoolId: parsed.data.schoolId }
    });
    return await this.app.createTeacher(authorization, parsed.data);
  }

  @Post("/v1/teachers/:teacherId/update")
  @Patch("/v1/teachers/:teacherId")
  async updateTeacher(
    @Req() req: Request,
    @Param("teacherId") teacherId: string,
    @Body() rawBody: unknown
  ): Promise<GetTeacherResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    const parsed = UpdateTeacherRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.teacherManage,
      resource: {}
    });
    return await this.app.updateTeacher(authorization, teacherId, parsed.data);
  }
}
