import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { AttendanceRecordDto, AttendanceStatus } from "@unified/packages-attendance-contract";

@Injectable()
export class PrismaAttendanceStore {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdateRecord(
    recordId: string,
    studentId: string,
    schoolId: string,
    date: string,
    status: AttendanceStatus,
    latitude?: number | null,
    longitude?: number | null,
    distanceMeters?: number | null,
    submittedAt?: Date | null,
    notes?: string | null
  ): Promise<AttendanceRecordDto> {
    const record = await this.prisma.attendanceRecord.upsert({
      where: {
        studentId_date: {
          studentId,
          date
        }
      },
      create: {
        attendanceId: recordId,
        studentId,
        schoolId,
        date,
        status,
        latitude,
        longitude,
        distanceMeters,
        submittedAt,
        notes
      },
      update: {
        status,
        latitude,
        longitude,
        distanceMeters,
        submittedAt,
        notes
      }
    });

    return {
      attendanceId: record.attendanceId,
      studentId: record.studentId,
      schoolId: record.schoolId,
      date: record.date,
      status: record.status as AttendanceStatus,
      latitude: record.latitude,
      longitude: record.longitude,
      distanceMeters: record.distanceMeters,
      submittedAt: record.submittedAt?.toISOString() || null,
      notes: record.notes,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString()
    };
  }

  async getDailyAttendance(schoolId: string, date: string): Promise<AttendanceRecordDto[]> {
    const records = await this.prisma.attendanceRecord.findMany({
      where: {
        schoolId,
        date
      }
    });

    return records.map((record: any) => ({
      attendanceId: record.attendanceId,
      studentId: record.studentId,
      schoolId: record.schoolId,
      date: record.date,
      status: record.status as AttendanceStatus,
      latitude: record.latitude,
      longitude: record.longitude,
      distanceMeters: record.distanceMeters,
      submittedAt: record.submittedAt?.toISOString() || null,
      notes: record.notes,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString()
    }));
  }
}
