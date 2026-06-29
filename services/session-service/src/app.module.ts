import { Module } from "@nestjs/common";
import { HealthController } from "./presentation/health.controller";
import { SessionController } from "./presentation/session.controller";
import { SessionApplicationService } from "./application/session-application.service";
import { PrismaService } from "./infrastructure/prisma.service";
import { PrismaSessionStore } from "./infrastructure/prisma-session-store";
import { TenantSchoolClient } from "./infrastructure/tenant-school-client";

@Module({
  controllers: [HealthController, SessionController],
  providers: [SessionApplicationService, PrismaService, PrismaSessionStore, TenantSchoolClient]
})
export class AppModule {}
