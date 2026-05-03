import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Global edge middleware.
 *
 * 1. Attaches a stable request id (`x-request-id`) so every request can
 *    be correlated between Cloud Run, Cloud Logging, and the client.
 * 2. Forwards Google Cloud's `X-Cloud-Trace-Context` header into a
 *    friendlier `x-trace-id` header that the app and logs can consume.
 * 3. Applies conservative cache headers for API routes to avoid
 *    accidentally caching responses at intermediary proxies.
 */
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  const existingRequestId = headers.get("x-request-id");
  const requestId = existingRequestId ?? crypto.randomUUID();
  headers.set("x-request-id", requestId);

  const cloudTrace = headers.get("x-cloud-trace-context");
  if (cloudTrace) {
    const [traceId] = cloudTrace.split("/");
    if (traceId) headers.set("x-trace-id", traceId);
  }

  const response = NextResponse.next({ request: { headers } });
  response.headers.set("x-request-id", requestId);

  if (request.nextUrl.pathname.startsWith("/api/")) {
    response.headers.set("Cache-Control", "no-store, max-age=0");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
