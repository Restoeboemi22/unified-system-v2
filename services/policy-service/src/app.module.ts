import { Module } from "@nestjs/common";
import { HealthController } from "./presentation/health.controller";
import { PolicyController } from "./presentation/policy.controller";
import { PolicyApplicationService } from "./application/policy-application.service";
import { SessionClient } from "./infrastructure/session-client";

@Module({
  controllers: [HealthController, PolicyController],
  providers: [PolicyApplicationService, SessionClient]
})
export class AppModule {}
