import { Injectable } from "@nestjs/common";
import { ClassroomDto } from "@unified/packages-academic-directory-contract";
import { PrismaService } from "./prisma.service";

@Injectable()
export class PrismaClassroomStore {
  constructor(private readonly prisma: PrismaService) {}

  async listBySchoolId(schoolId: string): Promise<ClassroomDto[]> {
    const classrooms = await this.prisma.classroom.findMany({
      where: { schoolId }
    });
    return classrooms.map((classroom) => this.mapToDto(classroom));
  }

  async getById(schoolId: string, classroomId: string): Promise<ClassroomDto | undefined> {
    const classroom = await this.prisma.classroom.findFirst({
      where: { schoolId, classroomId }
    });
    return classroom ? this.mapToDto(classroom) : undefined;
  }

  async findByName(
    schoolId: string,
    academicPeriodId: string,
    classroomName: string
  ): Promise<ClassroomDto | undefined> {
    const classroom = await this.prisma.classroom.findFirst({
      where: { schoolId, academicPeriodId, classroomName }
    });
    return classroom ? this.mapToDto(classroom) : undefined;
  }

  async save(classroom: ClassroomDto): Promise<void> {
    await this.prisma.classroom.upsert({
      where: { classroomId: classroom.classroomId },
      update: {
        schoolId: classroom.schoolId,
        academicPeriodId: classroom.academicPeriodId,
        gradeLevel: classroom.gradeLevel,
        classroomName: classroom.classroomName,
        homeroomTeacherId: classroom.homeroomTeacherId,
        status: classroom.status,
        updatedAt: new Date(classroom.updatedAt)
      },
      create: {
        classroomId: classroom.classroomId,
        schoolId: classroom.schoolId,
        academicPeriodId: classroom.academicPeriodId,
        gradeLevel: classroom.gradeLevel,
        classroomName: classroom.classroomName,
        homeroomTeacherId: classroom.homeroomTeacherId,
        status: classroom.status,
        createdAt: new Date(classroom.createdAt),
        updatedAt: new Date(classroom.updatedAt)
      }
    });
  }

  private mapToDto(classroom: {
    classroomId: string;
    schoolId: string;
    academicPeriodId: string;
    gradeLevel: string;
    classroomName: string;
    homeroomTeacherId: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }): ClassroomDto {
    return {
      classroomId: classroom.classroomId,
      schoolId: classroom.schoolId,
      academicPeriodId: classroom.academicPeriodId,
      gradeLevel: classroom.gradeLevel,
      classroomName: classroom.classroomName,
      homeroomTeacherId: classroom.homeroomTeacherId,
      status: classroom.status as "active" | "inactive",
      createdAt: classroom.createdAt.toISOString(),
      updatedAt: classroom.updatedAt.toISOString()
    };
  }
}
