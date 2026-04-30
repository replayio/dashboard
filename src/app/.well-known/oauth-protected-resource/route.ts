import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** API audience used with Auth0 for this product (see /api/auth/[auth0].ts). */
const RESOURCE = "https://api.replay.io";

export function GET() {
  const issuer = process.env.AUTH0_ISSUER_BASE_URL?.replace(/\/$/, "");
  if (!issuer) {
    return NextResponse.json(
      { error: "OAuth protected resource metadata is not configured (AUTH0_ISSUER_BASE_URL)." },
      { status: 503 }
    );
  }

  const body = {
    resource: RESOURCE,
    authorization_servers: [issuer],
    scopes_supported: ["openid", "offline_access"],
  };

  return NextResponse.json(body, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
