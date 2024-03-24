import { COOKIES, HEADERS } from "@/constants";
import {
  AccessTokenError,
  getAccessToken,
  getSession,
} from "@auth0/nextjs-auth0/edge";
import { cookies } from "next/headers";
import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;

  const response = NextResponse.next();

  const { ua } = userAgent(request);

  response.headers.set(HEADERS.userAgent, ua);

  switch (pathname) {
    case "/": {
      if (isMobile(ua)) {
        // If the user is attempting to visit Replay on a mobile device for the first time,
        // show them a message that it has not been optimized for mobile
        // If they have already confirmed this message (detectable via a cookie) then let them through
        const cookieStore = cookies();
        const cookie = cookieStore.get(COOKIES.mobileWarningDismissed);
        if (cookie == null && request.nextUrl.pathname !== "/mobile-warning") {
          return NextResponse.redirect(new URL("/mobile-warning", request.url));
        }
      }

      // Redirect root requests to the most recently viewed path
      const cookieStore = cookies();
      const cookie = cookieStore.get(COOKIES.defaultPathname);
      const pathname = cookie
        ? JSON.parse(cookie.value)
        : "/team/me/recordings";

      return NextResponse.redirect(new URL(pathname, request.url));
    }
    case "/org/new": {
      return NextResponse.redirect(new URL("/team/new?type=org", request.url));
    }
  }

  // Require authentication for protected routes
  if (pathname.startsWith("/org") || pathname.startsWith("/team")) {
    // Support e2e test and Support workflows
    const url = new URL(nextUrl);
    const apiKey = url.searchParams.get("apiKey");
    if (apiKey) {
      response.headers.set(HEADERS.accessToken, apiKey);

      return response;
    }

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

function isMobile(ua: string) {
  return /iP(hone|ad|od)/.test(ua) || /Android/.test(ua);
}
