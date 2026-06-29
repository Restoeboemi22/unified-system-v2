import { randomUUID } from "node:crypto";

export type LogLevel = "debug" | "info" | "warn" | "error";

export type Logger = {
  debug: (message: string, data?: Record<string, unknown>) => void;
  info: (message: string, data?: Record<string, unknown>) => void;
  warn: (message: string, data?: Record<string, unknown>) => void;
  error: (message: string, data?: Record<string, unknown>) => void;
};

export function createLogger(serviceName: string, defaultCorrelationId?: string): Logger {
  const write =
    (level: LogLevel) => (message: string, data?: Record<string, unknown>) => {
      const payload = {
        ts: new Date().toISOString(),
        level,
        service: serviceName,
        message,
        correlationId: data?.correlationId || defaultCorrelationId || undefined,
        ...(data ? { data } : {})
      };
      process.stdout.write(`${JSON.stringify(payload)}\n`);
    };

  return {
    debug: write("debug"),
    info: write("info"),
    warn: write("warn"),
    error: write("error")
  };
}

export function ensureRequestId(existing?: string): string {
  return existing && existing.trim().length > 0 ? existing : randomUUID();
}
