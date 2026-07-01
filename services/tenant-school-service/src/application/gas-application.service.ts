import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { AppHttpError } from "@unified/packages-shared-kernel";
import { SessionClient } from "../infrastructure/session-client";
import { PrismaTenantSchoolStore } from "../infrastructure/prisma-tenant-school-store";
import {
  GasAuditEventRecord,
  GasBroadcastRecord,
  GasGlobalConfigRecord,
  GasSupportTicketRecord,
  GasSyncJobRecord,
  PrismaGasStore,
} from "../infrastructure/prisma-gas-store";

const DEFAULT_GAS_GLOBAL_CONFIG = {
  school_year: "2025/2026",
  attendance_start_hour: 6,
  attendance_end_hour: 9,
  late_threshold_minutes: 15,
  features: {
    presensi_sholat: true,
    virtual_pet: false,
    halo_spentgapa: true,
  },
};

type SessionMe = Awaited<ReturnType<SessionClient["getSessionMe"]>>;

@Injectable()
export class GasApplicationService {
  constructor(
    private readonly sessionClient: SessionClient,
    private readonly tenantStore: PrismaTenantSchoolStore,
    private readonly gasStore: PrismaGasStore
  ) {}

  async getSyncJobs(authorizationHeader: string) {
    await this.getSessionMe(authorizationHeader);
    const jobs = await this.gasStore.getSyncJobs();
    return {
      jobs: jobs.map((item) => this.mapSyncJob(item)),
    };
  }

  async createSyncJob(
    authorizationHeader: string,
    input: { type: GasSyncJobRecord["type"]; schoolId?: string; note?: string }
  ) {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    const normalizedSchoolId = this.normalizeOptionalSchoolId(input.schoolId);
    if (normalizedSchoolId) {
      await this.assertSchoolExists(normalizedSchoolId);
    }

    const now = new Date().toISOString();
    const record: GasSyncJobRecord = {
      id: `job_${randomUUID()}`,
      type: input.type,
      status: "QUEUED",
      schoolId: normalizedSchoolId,
      note: input.note?.trim() || null,
      createdAt: now,
      updatedAt: now,
      createdBy: sessionMe.session.userId,
    };
    await this.gasStore.saveSyncJob(record);
    await this.writeAuditEvent({
      schoolId: normalizedSchoolId,
      action: "gas.sync_job.created",
      entity: "sync_job",
      entityId: record.id,
      performedBy: sessionMe.session.userId,
      details: JSON.stringify({
        type: record.type,
        schoolId: record.schoolId ?? null,
        note: record.note ?? null,
      }),
    });
    return { job: this.mapSyncJob(record) };
  }

  async updateSyncJobStatus(
    authorizationHeader: string,
    id: string,
    status: GasSyncJobRecord["status"]
  ) {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    const current = await this.gasStore.getSyncJobById(id);
    if (!current) {
      throw new AppHttpError(404, "NOT_FOUND", "Job tidak ditemukan");
    }
    const next: GasSyncJobRecord = {
      ...current,
      status,
      updatedAt: new Date().toISOString(),
    };
    await this.gasStore.saveSyncJob(next);
    await this.writeAuditEvent({
      schoolId: next.schoolId ?? null,
      action: "gas.sync_job.status_changed",
      entity: "sync_job",
      entityId: next.id,
      performedBy: sessionMe.session.userId,
      details: JSON.stringify({
        from: current.status,
        to: status,
        schoolId: next.schoolId ?? null,
      }),
    });
    return { job: this.mapSyncJob(next) };
  }

  async getBroadcasts(authorizationHeader: string) {
    await this.getSessionMe(authorizationHeader);
    const broadcasts = await this.gasStore.getBroadcasts();
    return {
      broadcasts: broadcasts.map((item) => this.mapBroadcast(item)),
    };
  }

  async createBroadcast(
    authorizationHeader: string,
    input: { title: string; message: string; target: GasBroadcastRecord["target"] }
  ) {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    const normalizedTarget =
      input.target.mode === "SCHOOL"
        ? { mode: "SCHOOL" as const, schoolId: input.target.schoolId.trim().toLowerCase() }
        : { mode: "ALL" as const };

    if (normalizedTarget.mode === "SCHOOL") {
      await this.assertSchoolExists(normalizedTarget.schoolId);
    }

    const record: GasBroadcastRecord = {
      id: `bc_${randomUUID()}`,
      title: input.title.trim(),
      message: input.message.trim(),
      target: normalizedTarget,
      createdAt: new Date().toISOString(),
      createdBy: sessionMe.session.userId,
    };
    await this.gasStore.saveBroadcast(record);
    await this.writeAuditEvent({
      schoolId: normalizedTarget.mode === "SCHOOL" ? normalizedTarget.schoolId : null,
      action: "gas.broadcast.created",
      entity: "broadcast",
      entityId: record.id,
      performedBy: sessionMe.session.userId,
      details: JSON.stringify({
        title: record.title,
        target: record.target,
      }),
    });
    return { broadcast: this.mapBroadcast(record) };
  }

  async deleteBroadcast(authorizationHeader: string, id: string) {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    const current = await this.gasStore.getBroadcastById(id);
    if (!current) {
      throw new AppHttpError(404, "NOT_FOUND", "Broadcast tidak ditemukan");
    }
    await this.gasStore.deleteBroadcast(id);
    await this.writeAuditEvent({
      schoolId: current.target.mode === "SCHOOL" ? current.target.schoolId : null,
      action: "gas.broadcast.deleted",
      entity: "broadcast",
      entityId: current.id,
      performedBy: sessionMe.session.userId,
      details: JSON.stringify({
        title: current.title,
        target: current.target,
      }),
    });
    return { success: true };
  }

  async getSupportTickets(authorizationHeader: string) {
    await this.getSessionMe(authorizationHeader);
    const tickets = await this.gasStore.getSupportTickets();
    return {
      tickets: tickets.map((item) => this.mapSupportTicket(item)),
    };
  }

  async createSupportTicket(
    authorizationHeader: string,
    input: {
      type: GasSupportTicketRecord["type"];
      schoolId: string;
      reason?: string;
    }
  ) {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    const schoolId = input.schoolId.trim().toLowerCase();
    await this.assertSchoolExists(schoolId);

    const now = new Date().toISOString();
    const record: GasSupportTicketRecord = {
      id: `tkt_${randomUUID()}`,
      type: input.type,
      schoolId,
      reason: input.reason?.trim() || null,
      status: "OPEN",
      createdAt: now,
      updatedAt: now,
      createdBy: sessionMe.session.userId,
    };
    await this.gasStore.saveSupportTicket(record);
    await this.writeAuditEvent({
      schoolId,
      action: "gas.support_ticket.created",
      entity: "support_ticket",
      entityId: record.id,
      performedBy: sessionMe.session.userId,
      details: JSON.stringify({
        type: record.type,
        schoolId,
        reason: record.reason ?? null,
      }),
    });
    return { ticket: this.mapSupportTicket(record) };
  }

  async updateSupportTicketStatus(
    authorizationHeader: string,
    id: string,
    status: GasSupportTicketRecord["status"]
  ) {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    const current = await this.gasStore.getSupportTicketById(id);
    if (!current) {
      throw new AppHttpError(404, "NOT_FOUND", "Ticket tidak ditemukan");
    }
    const next: GasSupportTicketRecord = {
      ...current,
      status,
      updatedAt: new Date().toISOString(),
    };
    await this.gasStore.saveSupportTicket(next);
    await this.writeAuditEvent({
      schoolId: next.schoolId,
      action: "gas.support_ticket.status_changed",
      entity: "support_ticket",
      entityId: next.id,
      performedBy: sessionMe.session.userId,
      details: JSON.stringify({
        from: current.status,
        to: status,
        schoolId: next.schoolId,
      }),
    });
    return { ticket: this.mapSupportTicket(next) };
  }

  async deleteSupportTicket(authorizationHeader: string, id: string) {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    const current = await this.gasStore.getSupportTicketById(id);
    if (!current) {
      throw new AppHttpError(404, "NOT_FOUND", "Ticket tidak ditemukan");
    }
    await this.gasStore.deleteSupportTicket(id);
    await this.writeAuditEvent({
      schoolId: current.schoolId,
      action: "gas.support_ticket.deleted",
      entity: "support_ticket",
      entityId: current.id,
      performedBy: sessionMe.session.userId,
      details: JSON.stringify({
        type: current.type,
        schoolId: current.schoolId,
      }),
    });
    return { success: true };
  }

  async getAuditLogs(authorizationHeader: string) {
    await this.getSessionMe(authorizationHeader);
    const logs = await this.gasStore.getAuditEvents();
    return {
      logs: logs.map((item) => ({
        id: item.id,
        action: item.action,
        entity: item.entity,
        entityId: item.entityId,
        performedBy: item.performedBy,
        details: item.details,
        createdAt: new Date(item.createdAt).getTime(),
      })),
    };
  }

  async getGlobalConfig(authorizationHeader: string) {
    await this.getSessionMe(authorizationHeader);
    const current = await this.ensureGlobalConfig();
    return {
      config: JSON.parse(current.jsonText),
      updatedAt: current.updatedAt,
      updatedBy: current.updatedBy ?? null,
    };
  }

  async saveGlobalConfig(authorizationHeader: string, input: unknown) {
    const sessionMe = await this.getSessionMe(authorizationHeader);
    if (!input || typeof input !== "object" || Array.isArray(input)) {
      throw new AppHttpError(
        400,
        "VALIDATION_ERROR",
        "Konfigurasi harus berupa object JSON"
      );
    }

    const record: GasGlobalConfigRecord = {
      configKey: "default",
      jsonText: JSON.stringify(input),
      updatedAt: new Date().toISOString(),
      updatedBy: sessionMe.session.userId,
    };
    await this.gasStore.saveGlobalConfig(record);
    await this.writeAuditEvent({
      schoolId: null,
      action: "gas.global_config.saved",
      entity: "global_config",
      entityId: record.configKey,
      performedBy: sessionMe.session.userId,
      details: record.jsonText,
    });
    return {
      config: input,
      updatedAt: record.updatedAt,
      updatedBy: record.updatedBy ?? null,
    };
  }

  private async ensureGlobalConfig(): Promise<GasGlobalConfigRecord> {
    const existing = await this.gasStore.getGlobalConfig("default");
    if (existing) return existing;

    const seeded: GasGlobalConfigRecord = {
      configKey: "default",
      jsonText: JSON.stringify(DEFAULT_GAS_GLOBAL_CONFIG),
      updatedAt: new Date().toISOString(),
      updatedBy: "system_seed",
    };
    await this.gasStore.saveGlobalConfig(seeded);
    return seeded;
  }

  private async getSessionMe(authorizationHeader: string): Promise<SessionMe> {
    return this.sessionClient.getSessionMe(authorizationHeader);
  }

  private async assertSchoolExists(schoolId: string): Promise<void> {
    const school = await this.tenantStore.getSchool(schoolId);
    if (!school) {
      throw new AppHttpError(404, "NOT_FOUND", "School tidak ditemukan");
    }
  }

  private normalizeOptionalSchoolId(value?: string | null): string | null {
    const normalized = String(value || "").trim().toLowerCase();
    if (!normalized || normalized === "all") return null;
    return normalized;
  }

  private async writeAuditEvent(
    input: Omit<GasAuditEventRecord, "id" | "createdAt">
  ): Promise<void> {
    await this.gasStore.saveAuditEvent({
      id: `gaudit_${randomUUID()}`,
      createdAt: new Date().toISOString(),
      ...input,
    });
  }

  private mapSyncJob(record: GasSyncJobRecord) {
    return {
      id: record.id,
      type: record.type,
      status: record.status,
      schoolId: record.schoolId ?? "all",
      note: record.note ?? null,
      createdAt: new Date(record.createdAt).getTime(),
      updatedAt: new Date(record.updatedAt).getTime(),
      createdBy: record.createdBy ?? null,
    };
  }

  private mapBroadcast(record: GasBroadcastRecord) {
    return {
      id: record.id,
      title: record.title,
      message: record.message,
      target: record.target,
      createdAt: new Date(record.createdAt).getTime(),
      createdBy: record.createdBy ?? null,
    };
  }

  private mapSupportTicket(record: GasSupportTicketRecord) {
    return {
      id: record.id,
      type: record.type,
      schoolId: record.schoolId,
      reason: record.reason ?? null,
      status: record.status,
      createdAt: new Date(record.createdAt).getTime(),
      updatedAt: new Date(record.updatedAt).getTime(),
      createdBy: record.createdBy ?? null,
    };
  }
}
