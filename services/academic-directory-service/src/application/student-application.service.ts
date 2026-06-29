import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { AppHttpError } from "@unified/packages-shared-kernel";
import {
  CreateStudentRequest,
  GetStudentResponse,
  ListStudentsResponse,
  StudentDto,
  UpdateStudentRequest
} from "@unified/packages-academic-directory-contract";
import { PrismaStudentStore } from "../infrastructure/prisma-student-store";
import { SessionClient } from "../infrastructure/session-client";

@Injectable()
export class StudentApplicationService {
  constructor(
    private readonly sessionClient: SessionClient,
    private readonly studentStore: PrismaStudentStore
  ) {}

  async listStudents(authorizationHeader: string, schoolId?: string): Promise<ListStudentsResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const effectiveSchoolId = schoolId ?? activeSchoolId;
    if (effectiveSchoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    const students = await this.studentStore.listBySchoolId(effectiveSchoolId);
    return { students };
  }

  async getStudent(
    authorizationHeader: string,
    studentId: string,
    schoolId?: string
  ): Promise<GetStudentResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const effectiveSchoolId = schoolId ?? activeSchoolId;
    if (effectiveSchoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    const student = await this.studentStore.getById(effectiveSchoolId, studentId);
    if (!student) {
      throw new AppHttpError(404, "NOT_FOUND", "Student tidak ditemukan");
    }
    return { student };
  }

  async createStudent(
    authorizationHeader: string,
    request: CreateStudentRequest
  ): Promise<GetStudentResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    if (request.schoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    const existing = await this.studentStore.findByStudentNumber(
      request.schoolId,
      request.studentNumber
    );
    if (existing) {
      throw new AppHttpError(409, "CONFLICT", "Student number sudah dipakai");
    }
    const now = new Date().toISOString();
    const student: StudentDto = {
      studentId: `std_${randomUUID()}`,
      schoolId: request.schoolId,
      studentNumber: request.studentNumber,
      fullName: request.fullName,
      status: "active",
      createdAt: now,
      updatedAt: now
    };
    await this.studentStore.save(student);
    return { student };
  }

  async updateStudent(
    authorizationHeader: string,
    studentId: string,
    request: UpdateStudentRequest
  ): Promise<GetStudentResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const existing = await this.studentStore.getById(activeSchoolId, studentId);
    if (!existing) {
      throw new AppHttpError(404, "NOT_FOUND", "Student tidak ditemukan");
    }

    const updated: StudentDto = {
      ...existing,
      fullName: request.fullName ?? existing.fullName,
      status: request.status ?? existing.status,
      updatedAt: new Date().toISOString()
    };

    await this.studentStore.save(updated);
    return { student: updated };
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
