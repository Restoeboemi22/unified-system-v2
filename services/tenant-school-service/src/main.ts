import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { createLogger, ensureRequestId } from "@unified/packages-observability";
import type { NextFunction, Request, Response } from "express";
import { AllExceptionsFilter } from "./presentation/all-exceptions.filter";

async function bootstrap() {
  const logger = createLogger("tenant-school-service");
  const app = await NestFactory.create(AppModule, { logger: false });

  app.enableCors({
    origin: true,
    credentials: true
  });

  app.useGlobalFilters(new AllExceptionsFilter(logger));

  app.use((req: Request, res: Response, next: NextFunction) => {
    const requestId = ensureRequestId(req.header("x-request-id"));
    res.setHeader("x-request-id", requestId);
    (req as any).requestId = requestId;
    next();
  });

  const port = Number(process.env.PORT ?? process.env.TENANT_SCHOOL_SERVICE_PORT ?? "4003");
  await app.listen(port);
  logger.info("listening", { port });
}

bootstrap();
