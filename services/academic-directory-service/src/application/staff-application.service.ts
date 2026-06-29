import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { AppHttpError } from "@unified/packages-shared-kernel";
import {
  CreateStaffRequest,
  GetStaffResponse,
  ListStaffsResponse,
  StaffDto,
  UpdateStaffRequest
} from "@unified/packages-academic-directory-contract";
import { SessionClient } from "../infrastructure/session-client";
import { PrismaStaffStore } from "../infrastructure/prisma-staff-store";

@Injectable()
export class StaffApplicationService {
  constructor(
    private readonly sessionClient: SessionClient,
    private readonly staffStore: PrismaStaffStore
  ) {}

  async listStaffs(authorizationHeader: string, schoolId?: string): Promise<ListStaffsResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const effectiveSchoolId = schoolId ?? activeSchoolId;
    if (effectiveSchoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    const staffs = await this.staffStore.listBySchoolId(effectiveSchoolId);
    return { staffs };
  }

  async getStaff(
    authorizationHeader: string,
    staffId: string,
    schoolId?: string
  ): Promise<GetStaffResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const effectiveSchoolId = schoolId ?? activeSchoolId;
    if (effectiveSchoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    const staff = await this.staffStore.getById(effectiveSchoolId, staffId);
    if (!staff) {
      throw new AppHttpError(404, "NOT_FOUND", "Staff tidak ditemukan");
    }
    return { staff };
  }

  async createStaff(authorizationHeader: string, request: CreateStaffRequest): Promise<GetStaffResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    if (request.schoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    const existing = await this.staffStore.findByEmployeeNumber(request.schoolId, request.employeeNumber);
    if (existing) {
      throw new AppHttpError(409, "CONFLICT", "Nomor induk staff sudah digunakan");
    }

    const now = new Date().toISOString();
    const staff: StaffDto = {
      staffId: `stf_${randomUUID()}`,
      schoolId: request.schoolId,
      employeeNumber: request.employeeNumber,
      fullName: request.fullName,
      positionTitle: request.positionTitle,
      status: "active",
      createdAt: now,
      updatedAt: now
    };
    await this.staffStore.save(staff);
    return { staff };
  }

  async updateStaff(
    authorizationHeader: string,
    staffId: string,
    request: UpdateStaffRequest
  ): Promise<GetStaffResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const existing = await this.staffStore.getById(activeSchoolId, staffId);
    if (!existing) {
      throw new AppHttpError(404, "NOT_FOUND", "Staff tidak ditemukan");
    }

    const updated: StaffDto = {
      ...existing,
      fullName: request.fullName ?? existing.fullName,
      positionTitle: request.positionTitle ?? existing.positionTitle,
      status: request.status ?? existing.status,
      updatedAt: new Date().toISOString()
    };
    await this.staffStore.save(updated);
    return { staff: updated };
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
