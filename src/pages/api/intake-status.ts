import { getCurrentUser } from "@/graphql/queries/getCurrentUser";
import { appendIntakeCompletedCookieOnApiResponse } from "@/utils/cookie";
import { getAccessTokenFromRequest, getAuthSubFromAccessToken } from "@/utils/intakeAuthServer";
import type { NextApiRequest, NextApiResponse } from "next";

const INTERCOM_TOKEN = process.env.INTERCOM_ACCESS_TOKEN;
const INTERCOM_API_VERSION = "2.14";

type IntercomContactSummary = {
  id?: string;
  email?: string;
  custom_attributes?: Record<string, unknown>;
};

type IntercomSearchResponse = {
  data?: IntercomContactSummary[];
};

function intercomHeaders(): HeadersInit | null {
  if (!INTERCOM_TOKEN) return null;
  return {
    Authorization: `Bearer ${INTERCOM_TOKEN}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    "Intercom-Version": INTERCOM_API_VERSION,
  };
}

async function fetchIntercomContactById(
  contactId: string,
  headers: HeadersInit
): Promise<IntercomContactSummary | null> {
  const res = await fetch(`https://api.intercom.io/contacts/${contactId}`, { headers });
  const text = await res.text();
  if (!text.trim() || !res.ok) {
    return null;
  }
  try {
    return JSON.parse(text) as IntercomContactSummary;
  } catch {
    return null;
  }
}

/**
 * Search by email, prefer exact email match, then load full contact if attributes are missing
 * (Intercom search payloads sometimes omit or slim down custom_attributes).
 */
async function findIntercomContactByEmail(email: string): Promise<IntercomContactSummary | null> {
  const headers = intercomHeaders();
  if (!headers) return null;

  const normalized = email.trim().toLowerCase();

  const res = await fetch("https://api.intercom.io/contacts/search", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: {
        operator: "AND",
        value: [{ field: "email", operator: "=", value: email.trim() }],
      },
      pagination: { per_page: 10 },
    }),
  });

  const text = await res.text();
  let body: IntercomSearchResponse = {};
  if (text.trim()) {
    try {
      body = JSON.parse(text) as IntercomSearchResponse;
    } catch {
      return null;
    }
  }

  if (!res.ok) {
    console.error("Intake status: Intercom search failed", res.status, body);
    return null;
  }

  const list = body.data ?? [];
  const exact =
    list.find(c => typeof c.email === "string" && c.email.trim().toLowerCase() === normalized) ??
    list[0];
  if (!exact?.id) return null;

  // Search hits often omit or slim custom_attributes; GET contact returns the full set (source, user_type, …).
  const full = await fetchIntercomContactById(exact.id, headers);
  return full ?? exact;
}

/** Intercom UI may show "vibe coder"; we store vibe_coder / engineer in the API. */
function normalizeIntakeUserType(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase().replace(/\s+/g, "_");
}

function hasDashboardIntakeMarker(attrs: Record<string, unknown> | undefined): boolean {
  if (!attrs) return false;
  if (attrs.source === "dashboard-intake") return true;
  const ut = normalizeIntakeUserType(attrs.user_type);
  return ut === "vibe_coder" || ut === "engineer";
}

/**
 * GET — whether this user already completed dashboard intake (Intercom contact has our marker).
 * Also returns `authSub` so the client can set the intake cookie without reading the access token (may be HttpOnly).
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Avoid CDN/browser 304 — stale "completed: false" traps users on /intake (Vercel, etc.).
  res.setHeader("Cache-Control", "private, no-store, no-cache, must-revalidate");
  res.setHeader("Vary", "Cookie");

  const accessToken = getAccessTokenFromRequest(req);
  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const authSub = getAuthSubFromAccessToken(accessToken);

  if (!INTERCOM_TOKEN) {
    return res.status(200).json({ completed: false, authSub });
  }

  let user;
  try {
    user = await getCurrentUser(accessToken, null);
  } catch (error) {
    console.error("Intake status: getCurrentUser failed:", error);
    return res.status(502).json({ error: "Could not load your profile." });
  }

  if (!user?.email) {
    return res.status(200).json({ completed: false, authSub });
  }

  try {
    const contact = await findIntercomContactByEmail(user.email);
    const attrs = contact?.custom_attributes as Record<string, unknown> | undefined;
    const completed = hasDashboardIntakeMarker(attrs);
    if (completed && authSub) {
      appendIntakeCompletedCookieOnApiResponse(res, authSub);
    }
    return res.status(200).json({ completed, authSub });
  } catch (error) {
    console.error("Intake status: Intercom error:", error);
    return res.status(200).json({ completed: false, authSub });
  }
}
