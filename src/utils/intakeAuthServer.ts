import { COOKIES } from "@/constants";
import type { AccessTokenCookie } from "@/utils/cookie";
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

export function getAuthSubFromAccessToken(accessToken: string): string | null {
  try {
    const decoded = jwt.decode(accessToken, { json: true }) as { sub?: string } | null;
    return typeof decoded?.sub === "string" ? decoded.sub : null;
  } catch {
    return null;
  }
}

export function getEmailFromAccessToken(accessToken: string): string | null {
  try {
    const decoded = jwt.decode(accessToken, { json: true }) as Record<string, unknown> | null;
    if (!decoded) return null;
    for (const key of ["email", "https://replay.io/email", "https://replay.io/claims/email"]) {
      const v = decoded[key];
      if (typeof v === "string" && v.includes("@")) return v.trim();
    }
    return null;
  } catch {
    return null;
  }
}

export function getNameFromAccessToken(accessToken: string): string | undefined {
  try {
    const decoded = jwt.decode(accessToken, { json: true }) as Record<string, unknown> | null;
    if (!decoded) return undefined;
    const n = decoded.name ?? decoded.nickname ?? decoded["https://replay.io/name"];
    return typeof n === "string" && n.trim() ? n.trim() : undefined;
  } catch {
    return undefined;
  }
}
