import { NextResponse } from "next/server";

// Current build deployment fingerprint
const BUILD_VERSION = "2026-08-30-v3";

export async function GET() {
  return NextResponse.json(
    {
      version: BUILD_VERSION,
      timestamp: Date.now(),
    },
    {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    }
  );
}
