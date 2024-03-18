import { HEADERS } from "@/constants";
import {
  AccessTokenError,
  getAccessToken,
  getSession,
} from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;

  const response = NextResponse.next();
  const session = await getSession(request, response);

  const isProtectedRoute = pathname === "/" || pathname.startsWith("/team");
  if (!session && isProtectedRoute) {
    const loginUrl = new URL("/api/auth/login", request.url);
    loginUrl.searchParams.set("returnTo", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  try {
    const { accessToken } = await getAccessToken(request, response);
    if (!accessToken) {
      throw Error("No access token");
    }

    response.headers.set(HEADERS.accessToken, accessToken);
  } catch (error) {
    if (error instanceof AccessTokenError) {
      // These errors will be handled via redirect
    } else {
      throw error;
    }
  }

  return response;
}
