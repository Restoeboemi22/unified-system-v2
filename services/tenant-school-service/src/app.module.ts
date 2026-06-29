import { Module } from "@nestjs/common";
import { HealthController } from "./presentation/health.controller";
import { TenantSchoolController } from "./presentation/tenant-school.controller";
import { GasMockController } from "./presentation/gas-mock.controller";
import { EdulockMockController } from "./presentation/edulock-mock.controller";
import { LenteraMockController } from "./presentation/lentera-mock.controller";
import { TenantSchoolApplicationService } from "./application/tenant-school-application.service";
import { SessionClient } from "./infrastructure/session-client";
import { PolicyClient } from "./infrastructure/policy-client";
import { PrismaService } from "./infrastructure/prisma.service";
import { PrismaTenantSchoolStore } from "./infrastructure/prisma-tenant-school-store";

@Module({
  controllers: [HealthController, TenantSchoolController, GasMockController, EdulockMockController, LenteraMockController],
  providers: [TenantSchoolApplicationService, SessionClient, PolicyClient, PrismaService, PrismaTenantSchoolStore]
})
export class AppModule {}
