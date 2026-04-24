import { COOKIES, HEADERS } from "@/constants";
import { getAccessToken, touchSession } from "@auth0/nextjs-auth0/edge";
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
    } else {
      redirectToIntakeIfNeeded(request, accessToken);
    }
  } catch (thrown) {
    if (thrown instanceof URL) {
      return NextResponse.redirect(thrown);
    }

    throw thrown;
  }

  switch (pathname) {
    case "/": {
      const cookieStore = cookies();
      const cookie = cookieStore.get(COOKIES.defaultPathname);

      let pathname = "/home";
      if (cookie) {
        try {
          pathname = JSON.parse(cookie.value);
        } catch {
          // Malformed cookie — fall back to /home
        }
      }

      const redirectURL = new URL(request.url);
      redirectURL.pathname = pathname;

      return NextResponse.redirect(redirectURL);
    }
    case "/org/new": {
      const redirectURL = new URL(request.url);
      redirectURL.pathname = "/team/new/standard";
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

  if (process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview") {
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
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|recording/_next/static|recording/images|recording/fonts).*)"],
};

async function getAccessTokenForSession(request: NextRequest, response: NextResponse) {
  if (request.nextUrl.pathname.startsWith("/api/auth/logout")) {
    return {
      source: null,
      token: null,
    };
  }

  await touchSession(request, response);

  const cookieStore = cookies();
  const prevAccessTokenCookieRaw = cookieStore.get(COOKIES.accessToken);
  let prevAccessTokenCookie: AccessTokenCookie | undefined;
  if (prevAccessTokenCookieRaw) {
    prevAccessTokenCookie = JSON.parse(prevAccessTokenCookieRaw.value);
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

      if (data.token !== prevAccessTokenCookie?.token) {
        setCookieValueServer(response, COOKIES.accessToken, data, cookieOptions);
      }

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

    if (data.token !== prevAccessTokenCookie?.token) {
      setCookieValueServer(response, COOKIES.accessToken, data);
    }

    return data;
  }

  if (prevAccessTokenCookie?.token) {
    return prevAccessTokenCookie;
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

/**
 * Intake gating uses a cookie as a fast path only. Intercom (via GET /api/intake-status on /intake)
 * is authoritative; a missing or stale cookie still sends the user through /intake once to re-sync.
 */
function redirectToIntakeIfNeeded(request: NextRequest, accessToken: string) {
  const { pathname, search } = request.nextUrl;
  if (
    pathname === "/intake" ||
    pathname === "/login" ||
    pathname.startsWith("/api/") ||
    pathname === "/mobile-warning"
  ) {
    return;
  }

  if (request.cookies.get(COOKIES.e2eSkipIntake)?.value === "1") {
    return;
  }

  let cookieUserId: string | null = null;
  const raw = request.cookies.get(COOKIES.intakeCompleted)?.value;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as { userId?: string };
      cookieUserId = typeof parsed?.userId === "string" ? parsed.userId : null;
    } catch {
      // ignore invalid cookie
    }
  }

  const decoded = jwt.decode(accessToken, { json: true }) as { sub?: string } | null;
  const sub = typeof decoded?.sub === "string" ? decoded.sub : null;
  if (!sub) return;
  if (cookieUserId === sub) return;

  const intakeUrl = new URL("/intake", request.url);
  intakeUrl.searchParams.set("returnTo", pathname + search);
  throw intakeUrl;
}

async function redirectIfProtectedRoute(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname, search } = nextUrl;

  if (
    pathname === "/" ||
    pathname === "/home" ||
    pathname === "/intake" ||
    pathname.startsWith("/org") ||
    pathname.startsWith("/team") ||
    pathname.startsWith("/user")
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("returnTo", pathname + search);

    throw loginUrl;
  }
}
