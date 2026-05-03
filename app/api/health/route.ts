import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logger, severityForStatus } from "@/lib/google-cloud/logger";

/**
 * Cloud Run readiness and liveness probe.
 *
 * Returns a deterministic JSON payload describing the running revision,
 * region, and project so operators can verify rollout state from the
 * Cloud Run console, `gcloud`, or `curl`. Every call is logged as a
 * structured Cloud Logging entry with request-id correlation.
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET(request: NextRequest) {
  const start = Date.now();
  const requestId = request.headers.get("x-request-id") ?? undefined;
  const traceId = request.headers.get("x-trace-id") ?? undefined;

  const body = {
    ok: true,
    service: process.env.K_SERVICE ?? "local",
    revision: process.env.K_REVISION ?? "local",
    region:
      process.env.GOOGLE_CLOUD_REGION ??
      process.env.FUNCTION_REGION ??
      "local",
    project: process.env.GOOGLE_CLOUD_PROJECT ?? "local",
    requestId,
    timestamp: new Date().toISOString(),
  };

  const response = NextResponse.json(body, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Health-Revision": body.revision,
    },
  });

  const latencyMs = Date.now() - start;
  const severity = severityForStatus(response.status);
  logger[severity === "INFO" ? "info" : "warn"]("health_check", {
    requestId,
    traceId,
    route: "/api/health",
    latencyMs,
    service: body.service,
    revision: body.revision,
    region: body.region,
  });

  return response;
}
