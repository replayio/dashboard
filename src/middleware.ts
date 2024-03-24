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

  try {
    await redirectIfMobile(request);
    await redirectIfUnauthenticated(request, response);
  } catch (thrown) {
    if (thrown instanceof URL) {
      return NextResponse.redirect(thrown);
    }

    throw thrown;
  }

  // Pass User Agent along to page requests in case it affects rendered content
  const { ua } = userAgent(request);
  response.headers.set(HEADERS.userAgent, ua);

  // Support e2e test and Support workflows
  const url = new URL(nextUrl);
  const apiKey = url.searchParams.get("apiKey");
  if (apiKey) {
    response.headers.set(HEADERS.accessToken, apiKey);
  }

  switch (pathname) {
    case "/": {
      // Redirect them to the most recently viewed path
      const cookieStore = cookies();
      const cookie = cookieStore.get(COOKIES.defaultPathname);

      const redirectURL = new URL(request.url);
      redirectURL.pathname = cookie
        ? JSON.parse(cookie.value)
        : "/team/me/recordings";

      return NextResponse.redirect(redirectURL);
    }
    case "/org/new": {
      const redirectURL = new URL(request.url);
      redirectURL.pathname = "/team/new";
      redirectURL.searchParams.set("type", "org");

      return NextResponse.redirect(redirectURL);
    }
  }

  if (!apiKey) {
    try {
      const { accessToken } = await getAccessToken(request, response);
      if (!accessToken) {
        throw Error("No access token");
      }

      response.headers.set(HEADERS.accessToken, accessToken);
    } catch (error) {
      if (error instanceof AccessTokenError) {
        // Ignore AccessTokenError; these are handled elsewhere
      } else {
        throw error;
      }
    }
  }

  return response;
}

async function redirectIfMobile(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const { ua } = userAgent(request);

    const isMobile = /iP(hone|ad|od)/.test(ua) || /Android/.test(ua);
    if (isMobile) {
      // If the user is attempting to visit Replay on a mobile device for the first time,
      // show them a message that it has not been optimized for mobile
      // If they have already confirmed this message (detectable via a cookie) then let them through
      const cookieStore = cookies();
      const cookie = cookieStore.get(COOKIES.mobileWarningDismissed);
      if (cookie == null && request.nextUrl.pathname !== "/mobile-warning") {
        throw new URL("/mobile-warning", request.url);
      }
    }
  }
}

async function redirectIfUnauthenticated(
  request: NextRequest,
  response: NextResponse
) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;

  const url = new URL(nextUrl);
  const apiKey = url.searchParams.get("apiKey");
  if (apiKey) {
    return;
  }

  if (
    pathname === "/" ||
    pathname.startsWith("/org") ||
    pathname.startsWith("/team")
  ) {
    const session = await getSession(request, response);
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("returnTo", request.nextUrl.pathname);

      throw loginUrl;
    }
  }
}
