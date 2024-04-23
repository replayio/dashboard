import cookie, { CookieSerializeOptions } from "cookie";
import { NextResponse } from "next/server";

export function deleteCookieValueClient(name: string) {
  document.cookie = name + "=; expires=-1; Max-Age=-99999999; path=/; SameSite=Lax";
}

export function getCookieValueClient<Type = string>(name: string): Type | null {
  const value = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() ?? null;
  return value !== null ? (JSON.parse(value) as Type) : null;
}

export function setCookieValueClient(name: string, value: any) {
  document.cookie = `${name}=${JSON.stringify(value)}; path=/; SameSite=Lax`;
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
