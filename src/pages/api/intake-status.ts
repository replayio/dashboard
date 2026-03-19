import { getCurrentUser } from "@/graphql/queries/getCurrentUser";
import { appendIntakeCompletedCookieOnApiResponse } from "@/utils/cookie";
import { getAccessTokenFromRequest, getAuthSubFromAccessToken } from "@/utils/intakeAuthServer";
import type { NextApiRequest, NextApiResponse } from "next";

const INTERCOM_TOKEN = process.env.INTERCOM_ACCESS_TOKEN;
const INTERCOM_API_VERSION = "2.14";

type IntercomSearchResponse = {
  data?: Array<{ custom_attributes?: Record<string, unknown> }>;
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

async function findIntercomContactByEmail(email: string) {
  const headers = intercomHeaders();
  if (!headers) return null;

  const res = await fetch("https://api.intercom.io/contacts/search", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: {
        operator: "AND",
        value: [{ field: "email", operator: "=", value: email }],
      },
      pagination: { per_page: 5 },
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

  return body.data?.[0] ?? null;
}

function hasDashboardIntakeMarker(attrs: Record<string, unknown> | undefined): boolean {
  if (!attrs) return false;
  return attrs.source === "dashboard-intake";
}

/**
 * GET — whether this user already completed dashboard intake (Intercom contact has our marker).
 * Also returns `authSub` so the client can set the intake cookie without reading the access token (may be HttpOnly).
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
