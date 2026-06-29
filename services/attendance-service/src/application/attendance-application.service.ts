import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaAttendanceStore } from "../infrastructure/prisma-attendance-store";
import { 
  SubmitAttendanceRequest, 
  AttendanceRecordDto, 
  AttendanceStatus,
  GetDailyAttendanceResponse
} from "@unified/packages-attendance-contract";

@Injectable()
export class AttendanceApplicationService {
  constructor(private readonly store: PrismaAttendanceStore) {}

  /**
   * Helper function to calculate distance using Haversine formula
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  /**
   * Submit daily attendance for a student
   */
  async submitAttendance(userId: string, schoolId: string, request: SubmitAttendanceRequest): Promise<AttendanceRecordDto> {
    const studentId = userId;

    // Fetch school coordinates from a shared service or cache (mocked for now, assuming 0,0 if not found)
    // In a real V2 scenario, this might be fetched via internal HTTP or gRPC to tenant-school-service.
    // For this POC, we'll use a mocked coordinate or throw if not set. 
    // Usually, you would fetch it via the tenant-school-contract.
    const schoolLat = -7.674996; // Example coordinate from detail aplikasi (Pacet)
    const schoolLon = 112.539352;

    const distance = this.calculateDistance(
      request.latitude,
      request.longitude,
      schoolLat,
      schoolLon
    );

    // 1. GPS Anti-Cheat Validation
    if (distance > 100) {
      throw new BadRequestException(`Anda berada di luar radius sekolah. Jarak Anda: ${Math.round(distance)} meter (Maks: 100m).`);
    }

    // 2. Time Validation (Before 07:00 is PRESENT, after is LATE)
    const now = new Date();
    // Use local time for 07:00 check (assuming UTC+7 for Indonesia)
    const localHour = (now.getUTCHours() + 7) % 24; 
    const localMinutes = now.getUTCMinutes();
    
    let status: AttendanceStatus = "PRESENT";
    if (localHour > 7 || (localHour === 7 && localMinutes > 0)) {
      status = "LATE";
    }

    // Format date as YYYY-MM-DD local
    const dateStr = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}`;
    const recordId = `att-${studentId}-${dateStr}`;

    return await this.store.createOrUpdateRecord(
      recordId,
      studentId,
      schoolId,
      dateStr,
      status,
      request.latitude,
      request.longitude,
      distance,
      now,
      null
    );
  }

  async getDailyAttendance(schoolId: string, date: string): Promise<GetDailyAttendanceResponse> {
    const records = await this.store.getDailyAttendance(schoolId, date);
    return { date, records };
  }
}
