import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

export type GasSyncJobRecord = {
  id: string;
  type: "master_data" | "attendance" | "users";
  status: "QUEUED" | "RUNNING" | "DONE" | "FAILED";
  schoolId?: string | null;
  note?: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy?: string | null;
};

export type GasBroadcastRecord = {
  id: string;
  title: string;
  message: string;
  target: { mode: "ALL" } | { mode: "SCHOOL"; schoolId: string };
  createdAt: string;
  createdBy?: string | null;
};

export type GasSupportTicketRecord = {
  id: string;
  type: "clear_cache" | "rerun_sync" | "reset_access";
  schoolId: string;
  reason?: string | null;
  status: "OPEN" | "DONE" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  createdBy?: string | null;
};

export type GasAuditEventRecord = {
  id: string;
  schoolId?: string | null;
  action: string;
  entity: string;
  entityId: string;
  performedBy: string;
  details: string;
  createdAt: string;
};

export type GasGlobalConfigRecord = {
  configKey: string;
  jsonText: string;
  updatedAt: string;
  updatedBy?: string | null;
};

@Injectable()
export class PrismaGasStore {
  constructor(private readonly prisma: PrismaService) {}

  async getSyncJobs(): Promise<GasSyncJobRecord[]> {
    const items = await this.prisma.gasSyncJob.findMany({
      orderBy: { createdAt: "desc" },
    });
    return items.map((item) => ({
      id: item.gasSyncJobId,
      type: item.type as GasSyncJobRecord["type"],
      status: item.status as GasSyncJobRecord["status"],
      schoolId: item.schoolId,
      note: item.note,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      createdBy: item.createdBy,
    }));
  }

  async getSyncJobById(id: string): Promise<GasSyncJobRecord | undefined> {
    const item = await this.prisma.gasSyncJob.findUnique({
      where: { gasSyncJobId: id },
    });
    if (!item) return undefined;
    return {
      id: item.gasSyncJobId,
      type: item.type as GasSyncJobRecord["type"],
      status: item.status as GasSyncJobRecord["status"],
      schoolId: item.schoolId,
      note: item.note,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      createdBy: item.createdBy,
    };
  }

  async saveSyncJob(record: GasSyncJobRecord): Promise<void> {
    await this.prisma.gasSyncJob.upsert({
      where: { gasSyncJobId: record.id },
      update: {
        type: record.type,
        status: record.status,
        schoolId: record.schoolId ?? null,
        note: record.note ?? null,
        createdAt: new Date(record.createdAt),
        updatedAt: new Date(record.updatedAt),
        createdBy: record.createdBy ?? null,
      },
      create: {
        gasSyncJobId: record.id,
        type: record.type,
        status: record.status,
        schoolId: record.schoolId ?? null,
        note: record.note ?? null,
        createdAt: new Date(record.createdAt),
        updatedAt: new Date(record.updatedAt),
        createdBy: record.createdBy ?? null,
      },
    });
  }

  async getBroadcasts(): Promise<GasBroadcastRecord[]> {
    const items = await this.prisma.gasBroadcast.findMany({
      orderBy: { createdAt: "desc" },
    });
    return items.map((item) => ({
      id: item.gasBroadcastId,
      title: item.title,
      message: item.message,
      target:
        item.targetMode === "SCHOOL" && item.targetSchoolId
          ? { mode: "SCHOOL", schoolId: item.targetSchoolId }
          : { mode: "ALL" },
      createdAt: item.createdAt.toISOString(),
      createdBy: item.createdBy,
    }));
  }

  async getBroadcastById(id: string): Promise<GasBroadcastRecord | undefined> {
    const item = await this.prisma.gasBroadcast.findUnique({
      where: { gasBroadcastId: id },
    });
    if (!item) return undefined;
    return {
      id: item.gasBroadcastId,
      title: item.title,
      message: item.message,
      target:
        item.targetMode === "SCHOOL" && item.targetSchoolId
          ? { mode: "SCHOOL", schoolId: item.targetSchoolId }
          : { mode: "ALL" },
      createdAt: item.createdAt.toISOString(),
      createdBy: item.createdBy,
    };
  }

  async saveBroadcast(record: GasBroadcastRecord): Promise<void> {
    await this.prisma.gasBroadcast.upsert({
      where: { gasBroadcastId: record.id },
      update: {
        title: record.title,
        message: record.message,
        targetMode: record.target.mode,
        targetSchoolId: record.target.mode === "SCHOOL" ? record.target.schoolId : null,
        createdAt: new Date(record.createdAt),
        createdBy: record.createdBy ?? null,
      },
      create: {
        gasBroadcastId: record.id,
        title: record.title,
        message: record.message,
        targetMode: record.target.mode,
        targetSchoolId: record.target.mode === "SCHOOL" ? record.target.schoolId : null,
        createdAt: new Date(record.createdAt),
        createdBy: record.createdBy ?? null,
      },
    });
  }

  async deleteBroadcast(id: string): Promise<void> {
    await this.prisma.gasBroadcast.delete({
      where: { gasBroadcastId: id },
    });
  }

  async getSupportTickets(): Promise<GasSupportTicketRecord[]> {
    const items = await this.prisma.gasSupportTicket.findMany({
      orderBy: { createdAt: "desc" },
    });
    return items.map((item) => ({
      id: item.gasSupportTicketId,
      type: item.type as GasSupportTicketRecord["type"],
      schoolId: item.schoolId,
      reason: item.reason,
      status: item.status as GasSupportTicketRecord["status"],
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      createdBy: item.createdBy,
    }));
  }

  async getSupportTicketById(id: string): Promise<GasSupportTicketRecord | undefined> {
    const item = await this.prisma.gasSupportTicket.findUnique({
      where: { gasSupportTicketId: id },
    });
    if (!item) return undefined;
    return {
      id: item.gasSupportTicketId,
      type: item.type as GasSupportTicketRecord["type"],
      schoolId: item.schoolId,
      reason: item.reason,
      status: item.status as GasSupportTicketRecord["status"],
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      createdBy: item.createdBy,
    };
  }

  async saveSupportTicket(record: GasSupportTicketRecord): Promise<void> {
    await this.prisma.gasSupportTicket.upsert({
      where: { gasSupportTicketId: record.id },
      update: {
        type: record.type,
        schoolId: record.schoolId,
        reason: record.reason ?? null,
        status: record.status,
        createdAt: new Date(record.createdAt),
        updatedAt: new Date(record.updatedAt),
        createdBy: record.createdBy ?? null,
      },
      create: {
        gasSupportTicketId: record.id,
        type: record.type,
        schoolId: record.schoolId,
        reason: record.reason ?? null,
        status: record.status,
        createdAt: new Date(record.createdAt),
        updatedAt: new Date(record.updatedAt),
        createdBy: record.createdBy ?? null,
      },
    });
  }

  async deleteSupportTicket(id: string): Promise<void> {
    await this.prisma.gasSupportTicket.delete({
      where: { gasSupportTicketId: id },
    });
  }

  async getAuditEvents(): Promise<GasAuditEventRecord[]> {
    const items = await this.prisma.gasAuditEvent.findMany({
      orderBy: { createdAt: "desc" },
    });
    return items.map((item) => ({
      id: item.gasAuditEventId,
      schoolId: item.schoolId,
      action: item.action,
      entity: item.entity,
      entityId: item.entityId,
      performedBy: item.performedBy,
      details: item.details,
      createdAt: item.createdAt.toISOString(),
    }));
  }

  async saveAuditEvent(record: GasAuditEventRecord): Promise<void> {
    await this.prisma.gasAuditEvent.create({
      data: {
        gasAuditEventId: record.id,
        schoolId: record.schoolId ?? null,
        action: record.action,
        entity: record.entity,
        entityId: record.entityId,
        performedBy: record.performedBy,
        details: record.details,
        createdAt: new Date(record.createdAt),
      },
    });
  }

  async getGlobalConfig(configKey: string): Promise<GasGlobalConfigRecord | undefined> {
    const item = await this.prisma.gasGlobalConfig.findUnique({
      where: { configKey },
    });
    if (!item) return undefined;
    return {
      configKey: item.configKey,
      jsonText: item.jsonText,
      updatedAt: item.updatedAt.toISOString(),
      updatedBy: item.updatedBy,
    };
  }

  async saveGlobalConfig(record: GasGlobalConfigRecord): Promise<void> {
    await this.prisma.gasGlobalConfig.upsert({
      where: { configKey: record.configKey },
      update: {
        jsonText: record.jsonText,
        updatedAt: new Date(record.updatedAt),
        updatedBy: record.updatedBy ?? null,
      },
      create: {
        configKey: record.configKey,
        jsonText: record.jsonText,
        updatedAt: new Date(record.updatedAt),
        updatedBy: record.updatedBy ?? null,
      },
    });
  }
}
