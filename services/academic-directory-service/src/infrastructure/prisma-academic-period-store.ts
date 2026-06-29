import { Injectable } from "@nestjs/common";
import { AcademicPeriodDto } from "@unified/packages-academic-directory-contract";
import { PrismaService } from "./prisma.service";

@Injectable()
export class PrismaAcademicPeriodStore {
  constructor(private readonly prisma: PrismaService) {}

  async listBySchoolId(schoolId: string): Promise<AcademicPeriodDto[]> {
    const academicPeriods = await this.prisma.academicPeriod.findMany({
      where: { schoolId }
    });
    return academicPeriods.map((academicPeriod) => this.mapToDto(academicPeriod));
  }

  async getById(schoolId: string, academicPeriodId: string): Promise<AcademicPeriodDto | undefined> {
    const academicPeriod = await this.prisma.academicPeriod.findFirst({
      where: { schoolId, academicPeriodId }
    });
    return academicPeriod ? this.mapToDto(academicPeriod) : undefined;
  }

  async findByYearAndSemester(
    schoolId: string,
    yearLabel: string,
    semesterLabel: string
  ): Promise<AcademicPeriodDto | undefined> {
    const academicPeriod = await this.prisma.academicPeriod.findFirst({
      where: { schoolId, yearLabel, semesterLabel }
    });
    return academicPeriod ? this.mapToDto(academicPeriod) : undefined;
  }

  async save(academicPeriod: AcademicPeriodDto): Promise<void> {
    await this.prisma.academicPeriod.upsert({
      where: { academicPeriodId: academicPeriod.academicPeriodId },
      update: {
        schoolId: academicPeriod.schoolId,
        yearLabel: academicPeriod.yearLabel,
        semesterLabel: academicPeriod.semesterLabel,
        startDate: new Date(academicPeriod.startDate),
        endDate: new Date(academicPeriod.endDate),
        status: academicPeriod.status,
        updatedAt: new Date(academicPeriod.updatedAt)
      },
      create: {
        academicPeriodId: academicPeriod.academicPeriodId,
        schoolId: academicPeriod.schoolId,
        yearLabel: academicPeriod.yearLabel,
        semesterLabel: academicPeriod.semesterLabel,
        startDate: new Date(academicPeriod.startDate),
        endDate: new Date(academicPeriod.endDate),
        status: academicPeriod.status,
        createdAt: new Date(academicPeriod.createdAt),
        updatedAt: new Date(academicPeriod.updatedAt)
      }
    });
  }

  private mapToDto(academicPeriod: {
    academicPeriodId: string;
    schoolId: string;
    yearLabel: string;
    semesterLabel: string;
    startDate: Date;
    endDate: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }): AcademicPeriodDto {
    return {
      academicPeriodId: academicPeriod.academicPeriodId,
      schoolId: academicPeriod.schoolId,
      yearLabel: academicPeriod.yearLabel,
      semesterLabel: academicPeriod.semesterLabel,
      startDate: academicPeriod.startDate.toISOString(),
      endDate: academicPeriod.endDate.toISOString(),
      status: academicPeriod.status as "planned" | "active" | "closed",
      createdAt: academicPeriod.createdAt.toISOString(),
      updatedAt: academicPeriod.updatedAt.toISOString()
    };
  }
}
