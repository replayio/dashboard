import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const res = NextResponse.next();
  const session = await getSession(req, res);

  const isProtectedRoute = nextUrl.pathname.startsWith("/team");
  if (!session && isProtectedRoute) {
    const loginUrl = new URL("/api/auth/login", req.url);
    loginUrl.searchParams.set("returnTo", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}
