import { COOKIES } from "@/constants";
import { AccessTokenCookie } from "@/utils/cookie";
import jwt from "jsonwebtoken";
import type { NextApiRequest } from "next";

export function getAccessTokenFromRequest(req: NextApiRequest): string | null {
  try {
    const raw = req.cookies[COOKIES.accessToken];
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AccessTokenCookie;
    return typeof parsed?.token === "string" ? parsed.token : null;
  } catch {
    return null;
  }
}

/** Same identifier middleware uses for `replay:dashboard:intake-completed` (JWT `sub`). */
export function getAuthSubFromAccessToken(accessToken: string): string | null {
  try {
    const decoded = jwt.decode(accessToken, { json: true }) as { sub?: string } | null;
    return typeof decoded?.sub === "string" ? decoded.sub : null;
  } catch {
    return null;
  }
}
