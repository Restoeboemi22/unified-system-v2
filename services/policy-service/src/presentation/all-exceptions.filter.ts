import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { AppHttpError, createApiErrorResponse } from "@unified/packages-shared-kernel";
import type { Request, Response } from "express";
import type { Logger } from "@unified/packages-observability";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const requestId = (req as any).requestId;

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const payload = exception.getResponse();
      this.logger.warn("http_exception", { requestId, status });
      res.status(status).json(payload);
      return;
    }

    if (exception instanceof AppHttpError) {
      this.logger.warn("app_http_exception", {
        requestId,
        status: exception.status,
        code: exception.code
      });
      res.status(exception.status).json(exception.toResponse());
      return;
    }

    const message = exception instanceof Error ? exception.message : "UNKNOWN_ERROR";
    this.logger.error("unhandled_exception", { requestId, message });
    res
      .status(500)
      .json(createApiErrorResponse("CONFLICT", "Internal server error", { requestId }));
  }
}
