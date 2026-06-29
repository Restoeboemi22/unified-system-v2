import { Controller, Post, Get, Body, Query, Req, HttpException } from "@nestjs/common";
import { AttendanceApplicationService } from "../application/attendance-application.service";
import { 
  SubmitAttendanceRequestSchema, 
  SubmitAttendanceResponse,
  GetDailyAttendanceResponse
} from "@unified/packages-attendance-contract";
import { CAPABILITIES } from "@unified/packages-capability-catalog";
import { createApiErrorResponse } from "@unified/packages-shared-kernel";
import type { Request } from "express";
import { PolicyClient } from "../infrastructure/policy-client";
import { SessionClient } from "../infrastructure/session-client";
import { z } from "zod";

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

@Controller("v1/attendance")
export class AttendanceController {
  constructor(
    private readonly appService: AttendanceApplicationService,
    private readonly policyClient: PolicyClient,
    private readonly sessionClient: SessionClient
  ) {}

  @Post("submit")
  async submitAttendance(@Req() req: Request, @Body() body: unknown): Promise<SubmitAttendanceResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"), 401);
    }
    
    // Parse request
    const parsed = SubmitAttendanceRequestSchema.safeParse(body);
    if (!parsed.success) badRequest(parsed.error);

    // Get session context to know who is submitting
    const { session } = await this.sessionClient.getSessionMe(authorization);
    
    // Assert allowed to submit
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.attendanceSubmit,
      resource: { schoolId: session.activeSchoolId! }
    });

    const record = await this.appService.submitAttendance(session.userId, session.activeSchoolId!, parsed.data);
    return { record };
  }

  @Get("daily")
  async getDailyAttendance(@Req() req: Request, @Query("date") date: string): Promise<GetDailyAttendanceResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"), 401);
    }

    const { session } = await this.sessionClient.getSessionMe(authorization);

    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.attendanceRead,
      resource: { schoolId: session.activeSchoolId! }
    });

    if (!date) {
      const now = new Date();
      date = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}`;
    }
    
    return await this.appService.getDailyAttendance(session.activeSchoolId!, date);
  }
}
