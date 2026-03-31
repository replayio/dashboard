import { COOKIES } from "@/constants";
import cookie, { CookieSerializeOptions } from "cookie";
import type { NextApiResponse } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

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

export function setCookieValueClient(name: string, value: unknown, options?: { maxAge?: number }) {
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

const INTAKE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function appendIntakeCompletedCookieOnApiResponse(
  res: NextApiResponse,
  authSub: string | null
) {
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
