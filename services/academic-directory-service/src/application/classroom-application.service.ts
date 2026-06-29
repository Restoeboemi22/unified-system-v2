import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { AppHttpError } from "@unified/packages-shared-kernel";
import {
  ClassroomDto,
  CreateClassroomRequest,
  GetClassroomResponse,
  ListClassroomsResponse,
  UpdateClassroomRequest
} from "@unified/packages-academic-directory-contract";
import { SessionClient } from "../infrastructure/session-client";
import { PrismaAcademicPeriodStore } from "../infrastructure/prisma-academic-period-store";
import { PrismaClassroomStore } from "../infrastructure/prisma-classroom-store";
import { PrismaTeacherStore } from "../infrastructure/prisma-teacher-store";

@Injectable()
export class ClassroomApplicationService {
  constructor(
    private readonly sessionClient: SessionClient,
    private readonly academicPeriodStore: PrismaAcademicPeriodStore,
    private readonly classroomStore: PrismaClassroomStore,
    private readonly teacherStore: PrismaTeacherStore
  ) {}

  async listClassrooms(authorizationHeader: string, schoolId?: string): Promise<ListClassroomsResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const effectiveSchoolId = schoolId ?? activeSchoolId;
    if (effectiveSchoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    const classrooms = await this.classroomStore.listBySchoolId(effectiveSchoolId);
    return { classrooms };
  }

  async getClassroom(
    authorizationHeader: string,
    classroomId: string,
    schoolId?: string
  ): Promise<GetClassroomResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const effectiveSchoolId = schoolId ?? activeSchoolId;
    if (effectiveSchoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    const classroom = await this.classroomStore.getById(effectiveSchoolId, classroomId);
    if (!classroom) {
      throw new AppHttpError(404, "NOT_FOUND", "Kelas tidak ditemukan");
    }
    return { classroom };
  }

  async createClassroom(
    authorizationHeader: string,
    request: CreateClassroomRequest
  ): Promise<GetClassroomResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    if (request.schoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    await this.assertValidAcademicPeriod(request.schoolId, request.academicPeriodId);
    await this.assertValidHomeroomTeacher(request.schoolId, request.homeroomTeacherId ?? null);
    const existing = await this.classroomStore.findByName(
      request.schoolId,
      request.academicPeriodId,
      request.classroomName
    );
    if (existing) {
      throw new AppHttpError(409, "CONFLICT", "Nama kelas sudah dipakai pada periode akademik ini");
    }

    const now = new Date().toISOString();
    const classroom: ClassroomDto = {
      classroomId: `cls_${randomUUID()}`,
      schoolId: request.schoolId,
      academicPeriodId: request.academicPeriodId,
      gradeLevel: request.gradeLevel,
      classroomName: request.classroomName,
      homeroomTeacherId: request.homeroomTeacherId ?? null,
      status: "active",
      createdAt: now,
      updatedAt: now
    };
    await this.classroomStore.save(classroom);
    return { classroom };
  }

  async updateClassroom(
    authorizationHeader: string,
    classroomId: string,
    request: UpdateClassroomRequest
  ): Promise<GetClassroomResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const existing = await this.classroomStore.getById(activeSchoolId, classroomId);
    if (!existing) {
      throw new AppHttpError(404, "NOT_FOUND", "Kelas tidak ditemukan");
    }

    const nextHomeroomTeacherId =
      request.homeroomTeacherId === undefined ? existing.homeroomTeacherId : request.homeroomTeacherId;
    await this.assertValidHomeroomTeacher(activeSchoolId, nextHomeroomTeacherId);

    const nextAcademicPeriodId = request.academicPeriodId ?? existing.academicPeriodId;
    await this.assertValidAcademicPeriod(activeSchoolId, nextAcademicPeriodId);
    const nextClassroomName = request.classroomName ?? existing.classroomName;
    const duplicate = await this.classroomStore.findByName(
      activeSchoolId,
      nextAcademicPeriodId,
      nextClassroomName
    );
    if (duplicate && duplicate.classroomId !== existing.classroomId) {
      throw new AppHttpError(409, "CONFLICT", "Nama kelas sudah dipakai pada periode akademik ini");
    }

    const updated: ClassroomDto = {
      ...existing,
      academicPeriodId: nextAcademicPeriodId,
      gradeLevel: request.gradeLevel ?? existing.gradeLevel,
      classroomName: nextClassroomName,
      homeroomTeacherId: nextHomeroomTeacherId,
      status: request.status ?? existing.status,
      updatedAt: new Date().toISOString()
    };

    await this.classroomStore.save(updated);
    return { classroom: updated };
  }

  private async assertValidHomeroomTeacher(
    schoolId: string,
    homeroomTeacherId: string | null
  ): Promise<void> {
    if (!homeroomTeacherId) return;
    const teacher = await this.teacherStore.getById(schoolId, homeroomTeacherId);
    if (!teacher) {
      throw new AppHttpError(400, "VALIDATION_ERROR", "Wali kelas tidak ditemukan pada tenant aktif");
    }
  }

  private async assertValidAcademicPeriod(schoolId: string, academicPeriodId: string): Promise<void> {
    const academicPeriod = await this.academicPeriodStore.getById(schoolId, academicPeriodId);
    if (!academicPeriod) {
      throw new AppHttpError(400, "VALIDATION_ERROR", "Periode akademik tidak ditemukan pada tenant aktif");
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
