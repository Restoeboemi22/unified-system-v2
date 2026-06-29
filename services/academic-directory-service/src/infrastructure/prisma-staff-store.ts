import { Injectable } from "@nestjs/common";
import { StaffDto } from "@unified/packages-academic-directory-contract";
import { PrismaService } from "./prisma.service";

@Injectable()
export class PrismaStaffStore {
  constructor(private readonly prisma: PrismaService) {}

  async listBySchoolId(schoolId: string): Promise<StaffDto[]> {
    const staffs = await this.prisma.staff.findMany({
      where: { schoolId }
    });
    return staffs.map((staff) => this.mapToDto(staff));
  }

  async getById(schoolId: string, staffId: string): Promise<StaffDto | undefined> {
    const staff = await this.prisma.staff.findFirst({
      where: { schoolId, staffId }
    });
    return staff ? this.mapToDto(staff) : undefined;
  }

  async findByEmployeeNumber(schoolId: string, employeeNumber: string): Promise<StaffDto | undefined> {
    const staff = await this.prisma.staff.findFirst({
      where: { schoolId, employeeNumber }
    });
    return staff ? this.mapToDto(staff) : undefined;
  }

  async save(staff: StaffDto): Promise<void> {
    await this.prisma.staff.upsert({
      where: { staffId: staff.staffId },
      update: {
        schoolId: staff.schoolId,
        employeeNumber: staff.employeeNumber,
        fullName: staff.fullName,
        positionTitle: staff.positionTitle,
        status: staff.status,
        updatedAt: new Date(staff.updatedAt)
      },
      create: {
        staffId: staff.staffId,
        schoolId: staff.schoolId,
        employeeNumber: staff.employeeNumber,
        fullName: staff.fullName,
        positionTitle: staff.positionTitle,
        status: staff.status,
        createdAt: new Date(staff.createdAt),
        updatedAt: new Date(staff.updatedAt)
      }
    });
  }

  private mapToDto(staff: {
    staffId: string;
    schoolId: string;
    employeeNumber: string;
    fullName: string;
    positionTitle: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }): StaffDto {
    return {
      staffId: staff.staffId,
      schoolId: staff.schoolId,
      employeeNumber: staff.employeeNumber,
      fullName: staff.fullName,
      positionTitle: staff.positionTitle,
      status: staff.status as "active" | "inactive",
      createdAt: staff.createdAt.toISOString(),
      updatedAt: staff.updatedAt.toISOString()
    };
  }
}
