import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma";
import { Logger, createLogger } from "@unified/packages-observability";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger: Logger;

  constructor() {
    super();
    this.logger = createLogger("attendance-service");
  }

  async onModuleInit() {
    this.logger.info("Connecting to database", { component: "PrismaService" });
    await this.$connect();
  }

  async onModuleDestroy() {
    this.logger.info("Disconnecting from database", { component: "PrismaService" });
    await this.$disconnect();
  }
}
