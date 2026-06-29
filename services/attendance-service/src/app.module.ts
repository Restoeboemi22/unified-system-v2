import { Module } from "@nestjs/common";
import { AttendanceController } from "./presentation/attendance.controller";
import { AttendanceApplicationService } from "./application/attendance-application.service";
import { PrismaService } from "./infrastructure/prisma.service";
import { PrismaAttendanceStore } from "./infrastructure/prisma-attendance-store";
import { SessionClient } from "./infrastructure/session-client";
import { PolicyClient } from "./infrastructure/policy-client";

@Module({
  imports: [],
  controllers: [AttendanceController],
  providers: [
    AttendanceApplicationService,
    PrismaService,
    PrismaAttendanceStore,
    SessionClient,
    PolicyClient
  ]
})
export class AppModule {}
