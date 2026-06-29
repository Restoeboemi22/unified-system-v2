import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { StudentDto } from "@unified/packages-academic-directory-contract";

@Injectable()
export class PrismaStudentStore {
  constructor(private readonly prisma: PrismaService) {}

  async listBySchoolId(schoolId: string): Promise<StudentDto[]> {
    const students = await this.prisma.student.findMany({
      where: { schoolId },
    });
    return students.map(this.mapToDto);
  }

  async getById(schoolId: string, studentId: string): Promise<StudentDto | undefined> {
    const student = await this.prisma.student.findFirst({
      where: { schoolId, studentId },
    });
    return student ? this.mapToDto(student) : undefined;
  }

  async findByStudentNumber(schoolId: string, studentNumber: string): Promise<StudentDto | undefined> {
    const student = await this.prisma.student.findFirst({
      where: { schoolId, studentNumber },
    });
    return student ? this.mapToDto(student) : undefined;
  }

  async save(student: StudentDto): Promise<void> {
    await this.prisma.student.upsert({
      where: { studentId: student.studentId },
      update: {
        schoolId: student.schoolId,
        studentNumber: student.studentNumber,
        fullName: student.fullName,
        status: student.status,
        updatedAt: new Date(student.updatedAt),
      },
      create: {
        studentId: student.studentId,
        schoolId: student.schoolId,
        studentNumber: student.studentNumber,
        fullName: student.fullName,
        status: student.status,
        createdAt: new Date(student.createdAt),
        updatedAt: new Date(student.updatedAt),
      },
    });
  }

  private mapToDto(student: any): StudentDto {
    return {
      studentId: student.studentId,
      schoolId: student.schoolId,
      studentNumber: student.studentNumber,
      fullName: student.fullName,
      status: student.status as any,
      createdAt: student.createdAt.toISOString(),
      updatedAt: student.updatedAt.toISOString(),
    };
  }
}
