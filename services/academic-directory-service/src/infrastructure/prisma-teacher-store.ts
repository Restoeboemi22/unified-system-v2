import { Injectable } from "@nestjs/common";
import { TeacherDto } from "@unified/packages-academic-directory-contract";
import { PrismaService } from "./prisma.service";

@Injectable()
export class PrismaTeacherStore {
  constructor(private readonly prisma: PrismaService) {}

  async listBySchoolId(schoolId: string): Promise<TeacherDto[]> {
    const teachers = await this.prisma.teacher.findMany({
      where: { schoolId }
    });
    return teachers.map((teacher) => this.mapToDto(teacher));
  }

  async getById(schoolId: string, teacherId: string): Promise<TeacherDto | undefined> {
    const teacher = await this.prisma.teacher.findFirst({
      where: { schoolId, teacherId }
    });
    return teacher ? this.mapToDto(teacher) : undefined;
  }

  async findByEmployeeNumber(schoolId: string, employeeNumber: string): Promise<TeacherDto | undefined> {
    const teacher = await this.prisma.teacher.findFirst({
      where: { schoolId, employeeNumber }
    });
    return teacher ? this.mapToDto(teacher) : undefined;
  }

  async save(teacher: TeacherDto): Promise<void> {
    await this.prisma.teacher.upsert({
      where: { teacherId: teacher.teacherId },
      update: {
        schoolId: teacher.schoolId,
        employeeNumber: teacher.employeeNumber,
        fullName: teacher.fullName,
        subjectLabels: JSON.stringify(teacher.subjectLabels),
        status: teacher.status,
        updatedAt: new Date(teacher.updatedAt)
      },
      create: {
        teacherId: teacher.teacherId,
        schoolId: teacher.schoolId,
        employeeNumber: teacher.employeeNumber,
        fullName: teacher.fullName,
        subjectLabels: JSON.stringify(teacher.subjectLabels),
        status: teacher.status,
        createdAt: new Date(teacher.createdAt),
        updatedAt: new Date(teacher.updatedAt)
      }
    });
  }

  private mapToDto(teacher: {
    teacherId: string;
    schoolId: string;
    employeeNumber: string;
    fullName: string;
    subjectLabels: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }): TeacherDto {
    return {
      teacherId: teacher.teacherId,
      schoolId: teacher.schoolId,
      employeeNumber: teacher.employeeNumber,
      fullName: teacher.fullName,
      subjectLabels: parseSubjectLabels(teacher.subjectLabels),
      status: teacher.status as "active" | "inactive",
      createdAt: teacher.createdAt.toISOString(),
      updatedAt: teacher.updatedAt.toISOString()
    };
  }
}

function parseSubjectLabels(rawValue: string): string[] {
  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}
