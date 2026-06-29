import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { randomUUID } from "crypto";

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: (req: any) => {
          return req.headers["x-correlation-id"] || randomUUID();
        },
        transport:
          process.env.NODE_ENV !== "production"
            ? {
                target: "pino-pretty",
                options: {
                  singleLine: true,
                },
              }
            : undefined,
      },
    }),
  ],
  exports: [LoggerModule],
})
export class AppLoggerModule {}
