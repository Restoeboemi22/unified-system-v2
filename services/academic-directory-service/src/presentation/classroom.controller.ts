import { Body, Controller, Get, Header, HttpException, Param, Patch, Post, Query, Req } from "@nestjs/common";
import type { Request } from "express";
import {
  CreateClassroomRequestSchema,
  GetClassroomResponse,
  ListClassroomsResponse,
  UpdateClassroomRequestSchema
} from "@unified/packages-academic-directory-contract";
import { CAPABILITIES } from "@unified/packages-capability-catalog";
import { createApiErrorResponse } from "@unified/packages-shared-kernel";
import { z } from "zod";
import { ClassroomApplicationService } from "../application/classroom-application.service";
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
export class ClassroomController {
  constructor(
    private readonly app: ClassroomApplicationService,
    private readonly policyClient: PolicyClient
  ) {}

  @Get("/v1/classrooms")
  @Header("cache-control", "no-store")
  async listClassrooms(
    @Req() req: Request,
    @Query("schoolId") schoolId?: string
  ): Promise<ListClassroomsResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    return await this.app.listClassrooms(authorization, schoolId);
  }

  @Get("/v1/classrooms/:classroomId")
  @Header("cache-control", "no-store")
  async getClassroom(
    @Req() req: Request,
    @Param("classroomId") classroomId: string,
    @Query("schoolId") schoolId?: string
  ): Promise<GetClassroomResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    return await this.app.getClassroom(authorization, classroomId, schoolId);
  }

  @Post("/v1/classrooms")
  async createClassroom(@Req() req: Request, @Body() rawBody: unknown): Promise<GetClassroomResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    const parsed = CreateClassroomRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.classroomManage,
      resource: { schoolId: parsed.data.schoolId }
    });
    return await this.app.createClassroom(authorization, parsed.data);
  }

  @Post("/v1/classrooms/:classroomId/update")
  @Patch("/v1/classrooms/:classroomId")
  async updateClassroom(
    @Req() req: Request,
    @Param("classroomId") classroomId: string,
    @Body() rawBody: unknown
  ): Promise<GetClassroomResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    const parsed = UpdateClassroomRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.classroomManage,
      resource: {}
    });
    return await this.app.updateClassroom(authorization, classroomId, parsed.data);
  }
}
