import { COOKIES } from "@/constants";
import cookie, { CookieSerializeOptions } from "cookie";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import type { NextApiResponse } from "next";
import { NextResponse } from "next/server";

const INTAKE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Sets intake-completed on the API response so middleware sees it (more reliable than `document.cookie` alone). */
export function appendIntakeCompletedCookieOnApiResponse(res: NextApiResponse, authSub: string | null) {
  if (!authSub) return;
  const serialized = cookie.serialize(
    COOKIES.intakeCompleted,
    JSON.stringify({ userId: authSub }),
    {
      path: "/",
      sameSite: "lax",
      maxAge: INTAKE_COOKIE_MAX_AGE,
    }
  );
  const existing = res.getHeader("Set-Cookie");
  if (!existing) {
    res.setHeader("Set-Cookie", serialized);
  } else if (Array.isArray(existing)) {
    res.setHeader("Set-Cookie", [...existing, serialized]);
  } else {
    res.setHeader("Set-Cookie", [String(existing), serialized]);
  }
}

export function deleteCookieValueClient(name: string) {
  document.cookie = name + "=; expires=-1; Max-Age=-99999999; path=/; SameSite=Lax";
}

export function getCookieValueClient<Type = string>(name: string): Type | null {
  const value = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() ?? null;
  return value !== null ? (JSON.parse(value) as Type) : null;
}

export function getCookieValueServer<Type = string>(
  requestCookies: NextApiRequestCookies,
  name: string
): Type | null {
  const value = requestCookies[name];
  return value != null ? (JSON.parse(value) as Type) : null;
}

export function setCookieValueClient(
  name: string,
  value: unknown,
  options?: { maxAge?: number }
) {
  let cookie = `${name}=${JSON.stringify(value)}; path=/; SameSite=Lax`;
  if (options?.maxAge) {
    cookie += `; max-age=${options.maxAge}`;
  }
  document.cookie = cookie;
}

export function setCookieValueServer(
  response: NextResponse,
  name: string,
  value: any,
  options?: CookieSerializeOptions
) {
  response.headers.append(
    "Set-Cookie",
    cookie.serialize(name, JSON.stringify(value), {
      path: "/",
      sameSite: "lax",
      ...options,
    })
  );
}

export interface AccessTokenCookie {
  token: string;
  source: string;
}

/** Auth0 subject from the access token — must match `jwt.decode(accessToken).sub` in middleware (not GraphQL user id). */
export function getAuth0SubFromAccessTokenCookie(): string | null {
  if (typeof document === "undefined") return null;
  try {
    const parsed = getCookieValueClient<AccessTokenCookie>(COOKIES.accessToken);
    const token = parsed?.token;
    if (!token || typeof token !== "string") return null;
    const parts = token.split(".");
    const payloadSegment = parts[1];
    if (parts.length < 2 || !payloadSegment) return null;
    const segment = payloadSegment.replace(/-/g, "+").replace(/_/g, "/");
    const padded = segment.padEnd(Math.ceil(segment.length / 4) * 4, "=");
    const payload = JSON.parse(atob(padded)) as { sub?: string };
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}
