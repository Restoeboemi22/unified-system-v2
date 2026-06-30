import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ensureRequestId, createLogger } from "@unified/packages-observability";
import type { NextFunction, Request, Response } from "express";
import { AllExceptionsFilter } from "./presentation/all-exceptions.filter";

async function bootstrap() {
  const logger = createLogger("session-service");
  const app = await NestFactory.create(AppModule, {
    logger: false
  });

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

  app.use((req: Request, _res: Response, next: NextFunction) => {
    logger.info("request", {
      requestId: (req as any).requestId,
      method: req.method,
      path: req.path
    });
    next();
  });

  const port = Number(process.env.PORT ?? process.env.SESSION_SERVICE_PORT ?? "4001");
  await app.listen(port);
  logger.info("listening", { port });
}

bootstrap();
