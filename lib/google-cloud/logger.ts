/**
 * Structured logger compatible with Google Cloud Logging.
 *
 * When running on Cloud Run, stdout JSON lines are automatically scraped
 * into Cloud Logging with severity, traceId, and labels preserved. This
 * helper emits that exact shape so application logs are first-class
 * observability signals in the Google Cloud Console without any extra
 * agent or SDK dependency.
 *
 * @see https://cloud.google.com/logging/docs/structured-logging
 */

export type LogSeverity =
  | "DEBUG"
  | "INFO"
  | "NOTICE"
  | "WARNING"
  | "ERROR"
  | "CRITICAL";

export interface LogContext {
  requestId?: string;
  traceId?: string;
  userId?: string;
  route?: string;
  latencyMs?: number;
  [key: string]: unknown;
}

interface LogEntry {
  severity: LogSeverity;
  message: string;
  time: string;
  service: string;
  revision: string;
  region: string;
  project: string;
  context?: LogContext;
  "logging.googleapis.com/trace"?: string;
  "logging.googleapis.com/labels"?: Record<string, string>;
}

const serviceMetadata = () => ({
  service: process.env.K_SERVICE ?? "local",
  revision: process.env.K_REVISION ?? "local",
  region:
    process.env.GOOGLE_CLOUD_REGION ?? process.env.FUNCTION_REGION ?? "local",
  project: process.env.GOOGLE_CLOUD_PROJECT ?? "local",
});

const traceField = (context?: LogContext) => {
  if (!context?.traceId) return undefined;
  const project = process.env.GOOGLE_CLOUD_PROJECT;
  return project
    ? `projects/${project}/traces/${context.traceId}`
    : context.traceId;
};

const write = (severity: LogSeverity, message: string, context?: LogContext) => {
  const entry: LogEntry = {
    severity,
    message,
    time: new Date().toISOString(),
    ...serviceMetadata(),
    context,
  };

  const trace = traceField(context);
  if (trace) entry["logging.googleapis.com/trace"] = trace;

  if (context?.requestId || context?.route) {
    entry["logging.googleapis.com/labels"] = {
      ...(context?.requestId ? { requestId: context.requestId } : {}),
      ...(context?.route ? { route: context.route } : {}),
    };
  }

  const line = JSON.stringify(entry);
  if (severity === "ERROR" || severity === "CRITICAL") {
    // eslint-disable-next-line no-console
    console.error(line);
  } else if (severity === "WARNING") {
    // eslint-disable-next-line no-console
    console.warn(line);
  } else {
    // eslint-disable-next-line no-console
    console.log(line);
  }
};

export const logger = {
  debug: (message: string, context?: LogContext) => write("DEBUG", message, context),
  info: (message: string, context?: LogContext) => write("INFO", message, context),
  notice: (message: string, context?: LogContext) => write("NOTICE", message, context),
  warn: (message: string, context?: LogContext) => write("WARNING", message, context),
  error: (message: string, context?: LogContext) => write("ERROR", message, context),
  critical: (message: string, context?: LogContext) => write("CRITICAL", message, context),
};

/**
 * Builds a Cloud Logging severity from an HTTP status code so request logs
 * can be triaged from the Cloud Logging Explorer without custom filters.
 */
export function severityForStatus(status: number): LogSeverity {
  if (status >= 500) return "ERROR";
  if (status >= 400) return "WARNING";
  if (status >= 300) return "NOTICE";
  return "INFO";
}
