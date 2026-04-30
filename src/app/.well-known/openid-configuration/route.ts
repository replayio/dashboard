import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const issuer = process.env.AUTH0_ISSUER_BASE_URL?.replace(/\/$/, "");
  if (!issuer) {
    return NextResponse.json(
      { error: "OpenID Connect discovery is not configured (AUTH0_ISSUER_BASE_URL)." },
      { status: 503 }
    );
  }
  return NextResponse.redirect(`${issuer}/.well-known/openid-configuration`, 307);
}
