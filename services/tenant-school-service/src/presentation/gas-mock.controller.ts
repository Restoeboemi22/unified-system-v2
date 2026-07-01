import { Body, Controller, Delete, Get, Header, HttpException, Param, Patch, Post, Put, Req } from "@nestjs/common";
import type { Request } from "express";
import { createApiErrorResponse } from "@unified/packages-shared-kernel";
import { CAPABILITIES } from "@unified/packages-capability-catalog";
import { z } from "zod";
import { GasApplicationService } from "../application/gas-application.service";
import { PolicyClient } from "../infrastructure/policy-client";

function parseAuthorizationHeader(req: Request): string | null {
  const header = req.header("authorization");
  if (!header) return null;
  return header;
}

function badRequest(error: z.ZodError): never {
  throw new HttpException(
    createApiErrorResponse("VALIDATION_ERROR", "Request validation error", {
      issues: error.issues,
    }),
    400
  );
}

const SyncJobCreateSchema = z.object({
  type: z.enum(["master_data", "attendance", "users"]),
  schoolId: z.string().trim().optional(),
  note: z.string().trim().optional(),
});

const SyncJobStatusSchema = z.object({
  status: z.enum(["QUEUED", "RUNNING", "DONE", "FAILED"]),
});

const BroadcastTargetSchema = z.discriminatedUnion("mode", [
  z.object({ mode: z.literal("ALL") }),
  z.object({ mode: z.literal("SCHOOL"), schoolId: z.string().trim().min(1) }),
]);

const BroadcastCreateSchema = z.object({
  title: z.string().trim().min(1),
  message: z.string().trim().min(1),
  target: BroadcastTargetSchema,
});

const SupportCreateSchema = z.object({
  type: z.enum(["clear_cache", "rerun_sync", "reset_access"]),
  schoolId: z.string().trim().min(1),
  reason: z.string().trim().optional(),
});

const SupportStatusSchema = z.object({
  status: z.enum(["OPEN", "DONE", "CANCELLED"]),
});

const GlobalConfigSchema = z.record(z.any());

@Controller("/v1/gas")
export class GasMockController {
  constructor(
    private readonly app: GasApplicationService,
    private readonly policyClient: PolicyClient
  ) {}

  // -- Sync Jobs --
  @Get("/sync-jobs")
  @Header("cache-control", "no-store")
  async getSyncJobs(@Req() req: Request) {
    const authorization = this.requireAuthorization(req);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: {},
    });
    return this.app.getSyncJobs(authorization);
  }

  @Post("/sync-jobs")
  async createSyncJob(@Req() req: Request, @Body() rawBody: unknown) {
    const authorization = this.requireAuthorization(req);
    const parsed = SyncJobCreateSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: parsed.data.schoolId ? { schoolId: parsed.data.schoolId } : {},
    });
    return this.app.createSyncJob(authorization, parsed.data);
  }

  @Patch("/sync-jobs/:id/status")
  async updateSyncJobStatus(@Req() req: Request, @Param("id") id: string, @Body() rawBody: unknown) {
    const authorization = this.requireAuthorization(req);
    const parsed = SyncJobStatusSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: {},
    });
    return this.app.updateSyncJobStatus(authorization, id, parsed.data.status);
  }

  // -- Broadcasts --
  @Get("/broadcasts")
  @Header("cache-control", "no-store")
  async getBroadcasts(@Req() req: Request) {
    const authorization = this.requireAuthorization(req);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: {},
    });
    return this.app.getBroadcasts(authorization);
  }

  @Post("/broadcasts")
  async createBroadcast(@Req() req: Request, @Body() rawBody: unknown) {
    const authorization = this.requireAuthorization(req);
    const parsed = BroadcastCreateSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource:
        parsed.data.target.mode === "SCHOOL"
          ? { schoolId: parsed.data.target.schoolId }
          : {},
    });
    return this.app.createBroadcast(authorization, parsed.data);
  }

  @Delete("/broadcasts/:id")
  async deleteBroadcast(@Req() req: Request, @Param("id") id: string) {
    const authorization = this.requireAuthorization(req);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: {},
    });
    return this.app.deleteBroadcast(authorization, id);
  }

  // -- Support Tickets --
  @Get("/support-tickets")
  @Header("cache-control", "no-store")
  async getSupportTickets(@Req() req: Request) {
    const authorization = this.requireAuthorization(req);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: {},
    });
    return this.app.getSupportTickets(authorization);
  }

  @Post("/support-tickets")
  async createSupportTicket(@Req() req: Request, @Body() rawBody: unknown) {
    const authorization = this.requireAuthorization(req);
    const parsed = SupportCreateSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: { schoolId: parsed.data.schoolId },
    });
    return this.app.createSupportTicket(authorization, parsed.data);
  }

  @Patch("/support-tickets/:id/status")
  async updateTicketStatus(@Req() req: Request, @Param("id") id: string, @Body() rawBody: unknown) {
    const authorization = this.requireAuthorization(req);
    const parsed = SupportStatusSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: {},
    });
    return this.app.updateSupportTicketStatus(authorization, id, parsed.data.status);
  }

  @Delete("/support-tickets/:id")
  async deleteTicket(@Req() req: Request, @Param("id") id: string) {
    const authorization = this.requireAuthorization(req);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: {},
    });
    return this.app.deleteSupportTicket(authorization, id);
  }

  // -- Audit Logs --
  @Get("/audit-logs")
  @Header("cache-control", "no-store")
  async getAuditLogs(@Req() req: Request) {
    const authorization = this.requireAuthorization(req);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: {},
    });
    return this.app.getAuditLogs(authorization);
  }

  @Get("/global-config")
  @Header("cache-control", "no-store")
  async getGlobalConfig(@Req() req: Request) {
    const authorization = this.requireAuthorization(req);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: {},
    });
    return this.app.getGlobalConfig(authorization);
  }

  @Put("/global-config")
  async saveGlobalConfig(@Req() req: Request, @Body() rawBody: unknown) {
    const authorization = this.requireAuthorization(req);
    const parsed = GlobalConfigSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: {},
    });
    return this.app.saveGlobalConfig(authorization, parsed.data);
  }

  private requireAuthorization(req: Request): string {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    return authorization;
  }
}
