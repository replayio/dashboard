import { COOKIES, HEADERS } from "@/constants";
import { getAccessToken } from "@auth0/nextjs-auth0/edge";
import { CookieSerializeOptions } from "cookie";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse, userAgent } from "next/server";
import { AccessTokenCookie, setCookieValueServer } from "./utils/cookie";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;

  const response = NextResponse.next();

  const { ua } = userAgent(request);

  const { source: accessTokenSource, token: accessToken } = await getAccessTokenForSession(
    request,
    response
  );

  try {
    await redirectIfMobile(request);
    if (!accessToken) {
      await redirectIfProtectedRoute(request);
    }
  } catch (thrown) {
    if (thrown instanceof URL) {
      return NextResponse.redirect(thrown);
    }

    throw thrown;
  }

  switch (pathname) {
    case "/": {
      // Redirect them to the most recently viewed path
      const cookieStore = cookies();
      const cookie = cookieStore.get(COOKIES.defaultPathname);

      const redirectURL = new URL(request.url);
      redirectURL.pathname = cookie ? JSON.parse(cookie.value) : "/team/me/recordings";

      return NextResponse.redirect(redirectURL);
    }
    case "/org/new": {
      const redirectURL = new URL(request.url);
      redirectURL.pathname = "/team/new";
      redirectURL.searchParams.set("type", "org");

      return NextResponse.redirect(redirectURL);
    }
  }

  // Pass User Agent along to page requests in case it affects rendered content
  response.headers.set(HEADERS.userAgent, ua);
  if (accessToken && accessTokenSource) {
    response.headers.set(HEADERS.accessToken, accessToken);
    response.headers.set(HEADERS.accessTokenSource, accessTokenSource);
  }

  const url = new URL(request.nextUrl);
  const mockGraphQLData = url.searchParams.get("mockGraphQLData");
  if (mockGraphQLData) {
    setCookieValueServer(response, COOKIES.mockGraphQLData, mockGraphQLData);

    response.headers.set(HEADERS.mockGraphQLData, mockGraphQLData);
  } else {
    const cookieStore = cookies();
    const mockGraphQLData = cookieStore.get(COOKIES.mockGraphQLData);
    if (mockGraphQLData) {
      response.headers.set(HEADERS.mockGraphQLData, mockGraphQLData.value);
    }
  }

  return response;
}

async function getAccessTokenForSession(request: NextRequest, response: NextResponse) {
  if (request.nextUrl.pathname.startsWith("/api/auth/logout")) {
    return {
      source: null,
      token: null,
    };
  }

  try {
    const { accessToken } = await getAccessToken(request, response);
    if (accessToken) {
      // An active auth0 session should always take precedence over an apiKey URL param
      const data = {
        source: "auth0",
        token: accessToken,
      } satisfies AccessTokenCookie;

      const cookieOptions: CookieSerializeOptions = {};
      const decodedToken = jwt.decode(accessToken, { json: true });
      if (decodedToken && typeof decodedToken.exp === "number") {
        const now = Math.floor(Date.now() / 1000);
        const timeUntilExpiration = decodedToken.exp - now;
        cookieOptions.maxAge = timeUntilExpiration;
      }

      setCookieValueServer(response, COOKIES.accessToken, data, cookieOptions);

      return data;
    }
  } catch (error) {
    // Ignore AccessTokenError; these are handled elsewhere
  }

  const url = new URL(request.nextUrl);
  const apiKey = url.searchParams.get("apiKey");
  if (apiKey) {
    // e2e tests and Support login flow
    const data = {
      source: "query",
      token: apiKey,
    } satisfies AccessTokenCookie;

    setCookieValueServer(response, COOKIES.accessToken, data);

    return data;
  }

  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get(COOKIES.accessToken);
  if (accessTokenCookie) {
    const tokenWithSource: AccessTokenCookie = JSON.parse(accessTokenCookie.value);
    if (typeof tokenWithSource === "object" && tokenWithSource.token) {
      return tokenWithSource;
    }
  }

  return {
    source: null,
    token: null,
  };
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

async function redirectIfProtectedRoute(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;

  if (
    pathname === "/" ||
    pathname.startsWith("/org") ||
    pathname.startsWith("/team") ||
    pathname.startsWith("/user")
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("returnTo", request.nextUrl.pathname);

    throw loginUrl;
  }
}
