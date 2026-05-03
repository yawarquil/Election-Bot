import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: process.env.K_SERVICE ?? "local",
      revision: process.env.K_REVISION ?? "local",
      region: process.env.GOOGLE_CLOUD_REGION ?? process.env.FUNCTION_REGION ?? "local",
      project: process.env.GOOGLE_CLOUD_PROJECT ?? "local",
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
