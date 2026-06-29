import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { createLogger } from "@unified/packages-observability";

async function bootstrap() {
  const logger = createLogger("attendance-service");
  // Create nest app and ignore internal logger
  const app = await NestFactory.create(AppModule, { logger: false });

  app.enableCors({ origin: "*" });

  const port = process.env.PORT || 4005;
  await app.listen(port);
  
  logger.info("listening", { port });
}
bootstrap();
