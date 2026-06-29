import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { AppHttpError } from "@unified/packages-shared-kernel";
import {
  AcademicPeriodDto,
  CreateAcademicPeriodRequest,
  GetAcademicPeriodResponse,
  ListAcademicPeriodsResponse,
  UpdateAcademicPeriodRequest
} from "@unified/packages-academic-directory-contract";
import { SessionClient } from "../infrastructure/session-client";
import { PrismaAcademicPeriodStore } from "../infrastructure/prisma-academic-period-store";

@Injectable()
export class AcademicPeriodApplicationService {
  constructor(
    private readonly sessionClient: SessionClient,
    private readonly academicPeriodStore: PrismaAcademicPeriodStore
  ) {}

  async listAcademicPeriods(
    authorizationHeader: string,
    schoolId?: string
  ): Promise<ListAcademicPeriodsResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const effectiveSchoolId = schoolId ?? activeSchoolId;
    if (effectiveSchoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    const academicPeriods = await this.academicPeriodStore.listBySchoolId(effectiveSchoolId);
    return { academicPeriods };
  }

  async getAcademicPeriod(
    authorizationHeader: string,
    academicPeriodId: string,
    schoolId?: string
  ): Promise<GetAcademicPeriodResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const effectiveSchoolId = schoolId ?? activeSchoolId;
    if (effectiveSchoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    const academicPeriod = await this.academicPeriodStore.getById(effectiveSchoolId, academicPeriodId);
    if (!academicPeriod) {
      throw new AppHttpError(404, "NOT_FOUND", "Periode akademik tidak ditemukan");
    }
    return { academicPeriod };
  }

  async createAcademicPeriod(
    authorizationHeader: string,
    request: CreateAcademicPeriodRequest
  ): Promise<GetAcademicPeriodResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    if (request.schoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    this.assertValidDateRange(request.startDate, request.endDate);
    const existing = await this.academicPeriodStore.findByYearAndSemester(
      request.schoolId,
      request.yearLabel,
      request.semesterLabel
    );
    if (existing) {
      throw new AppHttpError(409, "CONFLICT", "Periode akademik sudah terdaftar");
    }

    const now = new Date().toISOString();
    const academicPeriod: AcademicPeriodDto = {
      academicPeriodId: `ap_${randomUUID()}`,
      schoolId: request.schoolId,
      yearLabel: request.yearLabel,
      semesterLabel: request.semesterLabel,
      startDate: request.startDate,
      endDate: request.endDate,
      status: request.status,
      createdAt: now,
      updatedAt: now
    };
    await this.academicPeriodStore.save(academicPeriod);
    return { academicPeriod };
  }

  async updateAcademicPeriod(
    authorizationHeader: string,
    academicPeriodId: string,
    request: UpdateAcademicPeriodRequest
  ): Promise<GetAcademicPeriodResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const existing = await this.academicPeriodStore.getById(activeSchoolId, academicPeriodId);
    if (!existing) {
      throw new AppHttpError(404, "NOT_FOUND", "Periode akademik tidak ditemukan");
    }

    const nextStartDate = request.startDate ?? existing.startDate;
    const nextEndDate = request.endDate ?? existing.endDate;
    this.assertValidDateRange(nextStartDate, nextEndDate);

    const nextYearLabel = request.yearLabel ?? existing.yearLabel;
    const nextSemesterLabel = request.semesterLabel ?? existing.semesterLabel;
    const duplicate = await this.academicPeriodStore.findByYearAndSemester(
      activeSchoolId,
      nextYearLabel,
      nextSemesterLabel
    );
    if (duplicate && duplicate.academicPeriodId !== existing.academicPeriodId) {
      throw new AppHttpError(409, "CONFLICT", "Periode akademik sudah terdaftar");
    }

    const updated: AcademicPeriodDto = {
      ...existing,
      yearLabel: nextYearLabel,
      semesterLabel: nextSemesterLabel,
      startDate: nextStartDate,
      endDate: nextEndDate,
      status: request.status ?? existing.status,
      updatedAt: new Date().toISOString()
    };
    await this.academicPeriodStore.save(updated);
    return { academicPeriod: updated };
  }

  private assertValidDateRange(startDate: string, endDate: string): void {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new AppHttpError(400, "VALIDATION_ERROR", "Tanggal periode akademik tidak valid");
    }
    if (start > end) {
      throw new AppHttpError(400, "VALIDATION_ERROR", "Rentang tanggal periode akademik tidak valid");
    }
  }

  private async getActiveSchoolId(authorizationHeader: string): Promise<string> {
    const sessionMe = await this.sessionClient.getSessionMe(authorizationHeader);
    const activeSchoolId = sessionMe.session.activeSchoolId;
    if (!activeSchoolId) {
      throw new AppHttpError(409, "CONFLICT", "Tenant belum dipilih");
    }
    return activeSchoolId;
  }
}
