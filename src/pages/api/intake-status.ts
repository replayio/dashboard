import { getCurrentUser } from "@/graphql/queries/getCurrentUser";
import { appendIntakeCompletedCookieOnApiResponse } from "@/utils/cookie";
import { isIntakeComplete, pickBestIntercomContactForIntake } from "@/utils/intakeIntercomComplete";
import {
  getAccessTokenFromRequest,
  getAuthSubFromAccessToken,
  getEmailFromAccessToken,
} from "@/utils/intakeAuthServer";
import type { NextApiRequest, NextApiResponse } from "next";

const INTERCOM_TOKEN = process.env.INTERCOM_ACCESS_TOKEN;
const INTERCOM_API_VERSION = "2.14";

type Contact = {
  id?: string;
  email?: string;
  custom_attributes?: Record<string, unknown>;
  updated_at?: number;
};

type SearchBody = { data?: Contact[] };

function headers(): HeadersInit | null {
  if (!INTERCOM_TOKEN) return null;
  return {
    Authorization: `Bearer ${INTERCOM_TOKEN}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    "Intercom-Version": INTERCOM_API_VERSION,
  };
}

async function fetchContactById(id: string, h: HeadersInit): Promise<Contact | null> {
  const res = await fetch(`https://api.intercom.io/contacts/${id}`, { headers: h });
  const text = await res.text();
  if (!res.ok || !text.trim()) return null;
  try {
    return JSON.parse(text) as Contact;
  } catch {
    return null;
  }
}

async function findContactByEmail(email: string): Promise<Contact | null> {
  const h = headers();
  if (!h) return null;
  const normalized = email.trim().toLowerCase();
  const res = await fetch("https://api.intercom.io/contacts/search", {
    method: "POST",
    headers: h,
    body: JSON.stringify({
      query: {
        operator: "AND",
        value: [{ field: "email", operator: "=", value: email.trim() }],
      },
      pagination: { per_page: 50 },
    }),
  });
  const text = await res.text();
  let body: SearchBody = {};
  if (text.trim()) {
    try {
      body = JSON.parse(text) as SearchBody;
    } catch {
      return null;
    }
  }
  if (!res.ok) return null;
  const list = body.data ?? [];
  const sameEmail = list.filter(
    c => typeof c.email === "string" && c.email.trim().toLowerCase() === normalized
  );
  if (sameEmail.length === 0) {
    return null;
  }
  const fullRows = await Promise.all(
    sameEmail.map(row => (row.id ? fetchContactById(row.id, h) : Promise.resolve(null)))
  );
  const resolved = sameEmail.map((row, i) => fullRows[i] ?? row);
  return pickBestIntercomContactForIntake(resolved);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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

  let email: string | null = null;
  try {
    const user = await getCurrentUser(accessToken, null);
    email = user?.email ?? null;
  } catch {
    email = getEmailFromAccessToken(accessToken);
  }

  if (!email) {
    return res.status(200).json({ completed: false, authSub, intercomLookupSkipped: true });
  }

  try {
    const contact = await findContactByEmail(email);
    const attrs = contact?.custom_attributes;
    const completed = isIntakeComplete(attrs);
    if (completed && authSub) {
      appendIntakeCompletedCookieOnApiResponse(res, authSub);
    }
    return res.status(200).json({ completed, authSub });
  } catch (e) {
    console.error("intake-status:", e);
    return res.status(200).json({ completed: false, authSub });
  }
}
