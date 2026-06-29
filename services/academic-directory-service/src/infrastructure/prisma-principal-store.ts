import { Injectable } from "@nestjs/common";
import { PrincipalDto } from "@unified/packages-academic-directory-contract";
import { PrismaService } from "./prisma.service";

@Injectable()
export class PrismaPrincipalStore {
  constructor(private readonly prisma: PrismaService) {}

  async listBySchoolId(schoolId: string): Promise<PrincipalDto[]> {
    const principals = await this.prisma.principal.findMany({
      where: { schoolId }
    });
    return principals.map((principal) => this.mapToDto(principal));
  }

  async getById(schoolId: string, principalId: string): Promise<PrincipalDto | undefined> {
    const principal = await this.prisma.principal.findFirst({
      where: { schoolId, principalId }
    });
    return principal ? this.mapToDto(principal) : undefined;
  }

  async findByAppointmentCode(
    schoolId: string,
    appointmentCode: string
  ): Promise<PrincipalDto | undefined> {
    const principal = await this.prisma.principal.findFirst({
      where: { schoolId, appointmentCode }
    });
    return principal ? this.mapToDto(principal) : undefined;
  }

  async save(principal: PrincipalDto): Promise<void> {
    await this.prisma.principal.upsert({
      where: { principalId: principal.principalId },
      update: {
        schoolId: principal.schoolId,
        appointmentCode: principal.appointmentCode,
        fullName: principal.fullName,
        status: principal.status,
        updatedAt: new Date(principal.updatedAt)
      },
      create: {
        principalId: principal.principalId,
        schoolId: principal.schoolId,
        appointmentCode: principal.appointmentCode,
        fullName: principal.fullName,
        status: principal.status,
        createdAt: new Date(principal.createdAt),
        updatedAt: new Date(principal.updatedAt)
      }
    });
  }

  private mapToDto(principal: {
    principalId: string;
    schoolId: string;
    appointmentCode: string | null;
    fullName: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }): PrincipalDto {
    return {
      principalId: principal.principalId,
      schoolId: principal.schoolId,
      appointmentCode: principal.appointmentCode,
      fullName: principal.fullName,
      status: principal.status as "active" | "inactive",
      createdAt: principal.createdAt.toISOString(),
      updatedAt: principal.updatedAt.toISOString()
    };
  }
}
