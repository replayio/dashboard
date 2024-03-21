import { COOKIES, HEADERS } from "@/constants";
import {
  AccessTokenError,
  getAccessToken,
  getSession,
} from "@auth0/nextjs-auth0/edge";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;

  const response = NextResponse.next();

  switch (pathname) {
    case "/": {
      // Redirect root requests to the most recently viewed path
      const cookieStore = cookies();
      const cookie = cookieStore.get(COOKIES.defaultPathname);
      const pathname = cookie
        ? JSON.parse(cookie.value)
        : "/team/me/recordings";

      return NextResponse.redirect(new URL(pathname, request.url));
    }
  }

  // Require authentication for protected routes
  if (pathname.startsWith("/org") || pathname.startsWith("/team")) {
    const session = await getSession(request, response);
    if (!session) {
      const loginUrl = new URL("/api/auth/login", request.url);
      loginUrl.searchParams.set("returnTo", request.nextUrl.pathname);

      return NextResponse.redirect(loginUrl);
    }
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
