import { Controller, Get, Header, HttpException, Param, Patch, Post, Body, Req } from "@nestjs/common";
import type { Request } from "express";
import { createApiErrorResponse } from "@unified/packages-shared-kernel";

function parseAuthorizationHeader(req: Request): string | null {
  const header = req.header("authorization");
  if (!header) return null;
  return header;
}

// In-memory mock data
const syncJobs: any[] = [
  { id: "job-001", type: "master_data", status: "DONE", schoolId: "smpn_1_ngawi", note: "Sinkronisasi awal TA 2025/2026", createdAt: Date.now() - 86400000 * 3 },
  { id: "job-002", type: "attendance", status: "QUEUED", schoolId: "sman_2_ngawi", createdAt: Date.now() - 3600000 },
];

const broadcasts: any[] = [
  { id: "bc-001", title: "Maintenance Server 2025", message: "Server akan mati jam 02.00", targetAudience: "semua", status: "SENT", createdAt: Date.now() - 86400000 },
];

const supportTickets: any[] = [
  { id: "tkt-001", subject: "Lupa Password", description: "Saya tidak bisa login", senderEmail: "guru@sekolah.com", schoolId: "smpn_1_ngawi", status: "OPEN", createdAt: Date.now() - 3600000 },
];

const auditLogs: any[] = [
  { id: "adt-001", action: "UPDATE_STATUS", entity: "SCHOOL", entityId: "smpn_1_ngawi", performedBy: "superadmin@edulock.id", details: '{"from":"active","to":"limited"}', createdAt: Date.now() - 3600000 },
];

@Controller("/v1/gas")
export class GasMockController {
  
  // -- Sync Jobs --
  @Get("/sync-jobs")
  @Header("cache-control", "no-store")
  async getSyncJobs(@Req() req: Request) {
    if (!parseAuthorizationHeader(req)) throw new HttpException(createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"), 401);
    return { jobs: syncJobs };
  }

  @Post("/sync-jobs")
  async createSyncJob(@Req() req: Request, @Body() body: any) {
    if (!parseAuthorizationHeader(req)) throw new HttpException(createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"), 401);
    const newJob = {
      id: `job-${Date.now()}`,
      type: body.type,
      status: "QUEUED",
      schoolId: body.schoolId || "all",
      note: body.note,
      createdAt: Date.now()
    };
    syncJobs.unshift(newJob);
    return { job: newJob };
  }

  @Patch("/sync-jobs/:id/status")
  async updateSyncJobStatus(@Req() req: Request, @Param("id") id: string, @Body() body: any) {
    if (!parseAuthorizationHeader(req)) throw new HttpException(createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"), 401);
    const job = syncJobs.find(j => j.id === id);
    if (!job) throw new HttpException(createApiErrorResponse("NOT_FOUND", "Job tidak ditemukan"), 404);
    job.status = body.status;
    return { job };
  }

  // -- Broadcasts --
  @Get("/broadcasts")
  @Header("cache-control", "no-store")
  async getBroadcasts(@Req() req: Request) {
    if (!parseAuthorizationHeader(req)) throw new HttpException(createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"), 401);
    return { broadcasts };
  }

  @Post("/broadcasts")
  async createBroadcast(@Req() req: Request, @Body() body: any) {
    if (!parseAuthorizationHeader(req)) throw new HttpException(createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"), 401);
    const newBc = {
      id: `bc-${Date.now()}`,
      title: body.title,
      message: body.message,
      targetAudience: body.targetAudience,
      status: "SENT",
      createdAt: Date.now()
    };
    broadcasts.unshift(newBc);
    return { broadcast: newBc };
  }

  // -- Support Tickets --
  @Get("/support-tickets")
  @Header("cache-control", "no-store")
  async getSupportTickets(@Req() req: Request) {
    if (!parseAuthorizationHeader(req)) throw new HttpException(createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"), 401);
    return { tickets: supportTickets };
  }

  @Patch("/support-tickets/:id/status")
  async updateTicketStatus(@Req() req: Request, @Param("id") id: string, @Body() body: any) {
    if (!parseAuthorizationHeader(req)) throw new HttpException(createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"), 401);
    const t = supportTickets.find(t => t.id === id);
    if (!t) throw new HttpException(createApiErrorResponse("NOT_FOUND", "Ticket tidak ditemukan"), 404);
    t.status = body.status;
    return { ticket: t };
  }

  // -- Audit Logs --
  @Get("/audit-logs")
  @Header("cache-control", "no-store")
  async getAuditLogs(@Req() req: Request) {
    if (!parseAuthorizationHeader(req)) throw new HttpException(createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"), 401);
    return { logs: auditLogs };
  }
}
