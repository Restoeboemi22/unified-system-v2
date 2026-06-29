import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { AppHttpError } from "@unified/packages-shared-kernel";
import {
  CreateTeacherRequest,
  GetTeacherResponse,
  ListTeachersResponse,
  TeacherDto,
  UpdateTeacherRequest
} from "@unified/packages-academic-directory-contract";
import { SessionClient } from "../infrastructure/session-client";
import { PrismaTeacherStore } from "../infrastructure/prisma-teacher-store";

@Injectable()
export class TeacherApplicationService {
  constructor(
    private readonly sessionClient: SessionClient,
    private readonly teacherStore: PrismaTeacherStore
  ) {}

  async listTeachers(authorizationHeader: string, schoolId?: string): Promise<ListTeachersResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const effectiveSchoolId = schoolId ?? activeSchoolId;
    if (effectiveSchoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    const teachers = await this.teacherStore.listBySchoolId(effectiveSchoolId);
    return { teachers };
  }

  async getTeacher(
    authorizationHeader: string,
    teacherId: string,
    schoolId?: string
  ): Promise<GetTeacherResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const effectiveSchoolId = schoolId ?? activeSchoolId;
    if (effectiveSchoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    const teacher = await this.teacherStore.getById(effectiveSchoolId, teacherId);
    if (!teacher) {
      throw new AppHttpError(404, "NOT_FOUND", "Guru tidak ditemukan");
    }
    return { teacher };
  }

  async createTeacher(
    authorizationHeader: string,
    request: CreateTeacherRequest
  ): Promise<GetTeacherResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    if (request.schoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    const existing = await this.teacherStore.findByEmployeeNumber(
      request.schoolId,
      request.employeeNumber
    );
    if (existing) {
      throw new AppHttpError(409, "CONFLICT", "Nomor induk guru sudah dipakai");
    }
    const now = new Date().toISOString();
    const teacher: TeacherDto = {
      teacherId: `tch_${randomUUID()}`,
      schoolId: request.schoolId,
      employeeNumber: request.employeeNumber,
      fullName: request.fullName,
      subjectLabels: request.subjectLabels,
      status: "active",
      createdAt: now,
      updatedAt: now
    };
    await this.teacherStore.save(teacher);
    return { teacher };
  }

  async updateTeacher(
    authorizationHeader: string,
    teacherId: string,
    request: UpdateTeacherRequest
  ): Promise<GetTeacherResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const existing = await this.teacherStore.getById(activeSchoolId, teacherId);
    if (!existing) {
      throw new AppHttpError(404, "NOT_FOUND", "Guru tidak ditemukan");
    }

    const updated: TeacherDto = {
      ...existing,
      fullName: request.fullName ?? existing.fullName,
      subjectLabels: request.subjectLabels ?? existing.subjectLabels,
      status: request.status ?? existing.status,
      updatedAt: new Date().toISOString()
    };

    await this.teacherStore.save(updated);
    return { teacher: updated };
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
