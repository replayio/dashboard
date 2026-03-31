import { INTERCOM_CONTACT_ATTR } from "@/constants";
import { getCurrentUser } from "@/graphql/queries/getCurrentUser";
import { appendIntakeCompletedCookieOnApiResponse } from "@/utils/cookie";
import { intercomCompanyNameAttributeKey } from "@/utils/intakeIntercomComplete";
import {
  getAccessTokenFromRequest,
  getAuthSubFromAccessToken,
  getEmailFromAccessToken,
  getNameFromAccessToken,
} from "@/utils/intakeAuthServer";
import type { NextApiRequest, NextApiResponse } from "next";

const INTERCOM_TOKEN = process.env.INTERCOM_ACCESS_TOKEN;
const INTERCOM_API_VERSION = "2.14";

type IntercomErrorBody = {
  id?: string;
  errors?: Array<{ code?: string; message?: string; data?: { contact_id?: string } }>;
};

function intercomHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${INTERCOM_TOKEN!}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    "Intercom-Version": INTERCOM_API_VERSION,
  };
}

async function parseIntercomJson(res: Response): Promise<IntercomErrorBody> {
  const text = await res.text();
  if (!text.trim()) return {};
  try {
    return JSON.parse(text) as IntercomErrorBody;
  } catch {
    return {};
  }
}

function isFetchFailure(error: unknown): boolean {
  return error instanceof TypeError || (error instanceof Error && error.message === "fetch failed");
}

function getExistingContactIdFromErrorBody(data: IntercomErrorBody): string | null {
  const err = data.errors?.[0];
  if (!err) return null;
  if (err.data?.contact_id) return err.data.contact_id;
  const m = (err.message ?? "").match(/\bid=([a-f0-9]+)\b/i);
  return m?.[1] ?? null;
}

function isDuplicateContactError(res: Response, data: IntercomErrorBody): boolean {
  const err = data.errors?.[0];
  const msg = (err?.message ?? "").toLowerCase();
  return (
    err?.code?.toLowerCase() === "conflict" ||
    res.status === 409 ||
    msg.includes("already exists") ||
    msg.includes("matching those details")
  );
}

type CompanyList = { data?: Array<{ id?: string; name?: string }> };

async function resolveIntercomCompanyRecordId(name: string): Promise<string | null> {
  const trimmed = name.trim();
  if (!trimmed) return null;
  let searchRes: Response;
  try {
    searchRes = await fetch(
      `https://api.intercom.io/companies?name=${encodeURIComponent(trimmed)}`,
      { headers: intercomHeaders() }
    );
  } catch (e) {
    if (isFetchFailure(e)) return null;
    throw e;
  }
  const listRaw = await parseIntercomJson(searchRes);
  if (searchRes.ok) {
    const list = listRaw as CompanyList;
    const hit =
      list.data?.find(c => c.name?.trim().toLowerCase() === trimmed.toLowerCase()) ??
      list.data?.[0];
    if (hit?.id) return hit.id;
  }
  let createRes: Response;
  try {
    createRes = await fetch("https://api.intercom.io/companies", {
      method: "POST",
      headers: intercomHeaders(),
      body: JSON.stringify({ name: trimmed }),
    });
  } catch (e) {
    if (isFetchFailure(e)) return null;
    throw e;
  }
  const created = (await parseIntercomJson(createRes)) as { id?: string };
  return createRes.ok && created.id ? created.id : null;
}

async function attachCompanyToContact(contactId: string, companyName: string): Promise<void> {
  const companyId = await resolveIntercomCompanyRecordId(companyName);
  if (!companyId) return;
  try {
    const attachRes = await fetch(`https://api.intercom.io/contacts/${contactId}/companies`, {
      method: "POST",
      headers: intercomHeaders(),
      body: JSON.stringify({ id: companyId }),
    });
    if (!attachRes.ok) {
      console.error("Intercom attach company:", await parseIntercomJson(attachRes));
    }
  } catch (e) {
    if (!isFetchFailure(e)) throw e;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!INTERCOM_TOKEN) {
    return res.status(500).json({ error: "Intercom is not configured" });
  }

  const accessToken = getAccessTokenFromRequest(req);
  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const authSub = getAuthSubFromAccessToken(accessToken);

  let email: string | null = null;
  let name: string | undefined;
  try {
    const user = await getCurrentUser(accessToken, null);
    email = user?.email ?? null;
    name = user?.name;
  } catch {
    email = getEmailFromAccessToken(accessToken);
    name = getNameFromAccessToken(accessToken);
  }
  if (!email) {
    return res.status(502).json({ error: "Could not resolve your email for Intercom." });
  }

  const body = req.body as {
    userType: "vibe_coder" | "engineer";
    vibeTool?: string;
    companyName?: string;
  };
  const { userType, vibeTool, companyName } = body;

  if (!userType || !["vibe_coder", "engineer"].includes(userType)) {
    return res.status(400).json({ error: "userType must be vibe_coder or engineer" });
  }
  if (userType === "vibe_coder" && !vibeTool?.trim()) {
    return res.status(400).json({ error: "Tool is required for VibeCoder" });
  }
  if (userType === "engineer" && !companyName?.trim()) {
    return res.status(400).json({ error: "Company name is required for Engineer" });
  }

  const companyKey = intercomCompanyNameAttributeKey();
  const companyTrimmed = companyName?.trim() ?? "";

  const custom_attributes: Record<string, string | null> = {
    [INTERCOM_CONTACT_ATTR.userType]: userType,
    [INTERCOM_CONTACT_ATTR.source]: "dashboard-intake",
  };
  if (userType === "vibe_coder" && vibeTool?.trim()) {
    custom_attributes[INTERCOM_CONTACT_ATTR.vibeTool] = vibeTool.trim();
    if (companyTrimmed) {
      custom_attributes[companyKey] = companyTrimmed;
    }
  }
  if (userType === "engineer") {
    custom_attributes[INTERCOM_CONTACT_ATTR.vibeTool] = null;
    custom_attributes[companyKey] = companyTrimmed;
  }

  const payload = {
    role: "user" as const,
    email,
    ...(name && { name }),
    custom_attributes,
  };

  try {
    let intercomRes: Response;
    try {
      intercomRes = await fetch("https://api.intercom.io/contacts", {
        method: "POST",
        headers: intercomHeaders(),
        body: JSON.stringify(payload),
      });
    } catch (e) {
      if (isFetchFailure(e)) {
        return res.status(503).json({
          error: "Could not reach Intercom. Check INTERCOM_ACCESS_TOKEN and network.",
          code: "intercom_unreachable",
        });
      }
      throw e;
    }

    const data = await parseIntercomJson(intercomRes);

    if (!intercomRes.ok) {
      const dupId = getExistingContactIdFromErrorBody(data);
      if (dupId && isDuplicateContactError(intercomRes, data)) {
        let putRes: Response;
        try {
          putRes = await fetch(`https://api.intercom.io/contacts/${dupId}`, {
            method: "PUT",
            headers: intercomHeaders(),
            body: JSON.stringify({
              custom_attributes,
              ...(name && { name }),
            }),
          });
        } catch (e) {
          if (isFetchFailure(e)) {
            return res
              .status(503)
              .json({ error: "Could not reach Intercom.", code: "intercom_unreachable" });
          }
          throw e;
        }
        const putData = await parseIntercomJson(putRes);
        if (!putRes.ok) {
          return res.status(putRes.status).json({
            error: putData?.errors?.[0]?.message || "Intercom API error",
          });
        }
        const cid = (putData as { id?: string }).id ?? dupId;
        if (companyTrimmed) {
          await attachCompanyToContact(cid, companyTrimmed);
        }
        appendIntakeCompletedCookieOnApiResponse(res, authSub);
        return res.status(200).json({ ...(putData as object), authSub });
      }
      return res.status(intercomRes.status).json({
        error: data?.errors?.[0]?.message || "Intercom API error",
      });
    }

    const createdId = (data as { id?: string }).id;
    if (companyTrimmed && createdId) {
      await attachCompanyToContact(createdId, companyTrimmed);
    }
    appendIntakeCompletedCookieOnApiResponse(res, authSub);
    return res.status(200).json({ ...(data as object), authSub });
  } catch (error) {
    console.error("Intercom intake:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
