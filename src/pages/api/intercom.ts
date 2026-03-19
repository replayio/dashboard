import { getCurrentUser } from "@/graphql/queries/getCurrentUser";
import { appendIntakeCompletedCookieOnApiResponse } from "@/utils/cookie";
import { getAccessTokenFromRequest, getAuthSubFromAccessToken } from "@/utils/intakeAuthServer";
import { NextApiRequest, NextApiResponse } from "next";

const INTERCOM_TOKEN = process.env.INTERCOM_ACCESS_TOKEN;
/** Pin REST version; see https://developers.intercom.com/docs/references/rest-api/api.intercom.io/contacts/createcontact */
const INTERCOM_API_VERSION = "2.14";

type IntercomErrorBody = {
  id?: string;
  errors?: Array<{ code?: string; message?: string; data?: { contact_id?: string } }>;
};

/** Intercom sometimes returns duplicate-contact errors with the id only in the message, not in errors[].data */
function getExistingContactIdFromErrorBody(data: IntercomErrorBody): string | null {
  const err = data.errors?.[0];
  if (!err) return null;
  const fromPayload = err.data?.contact_id;
  if (fromPayload) return fromPayload;
  const msg = err.message ?? "";
  const idMatch = msg.match(/\bid=([a-f0-9]+)\b/i);
  return idMatch?.[1] ?? null;
}

function isDuplicateContactError(response: Response, data: IntercomErrorBody): boolean {
  const err = data.errors?.[0];
  const code = err?.code?.toLowerCase();
  const msg = (err?.message ?? "").toLowerCase();
  if (code === "conflict") return true;
  if (response.status === 409) return true;
  if (msg.includes("already exists")) return true;
  if (msg.includes("matching those details")) return true;
  return false;
}

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
  if (!text.trim()) {
    return {};
  }
  try {
    return JSON.parse(text) as IntercomErrorBody;
  } catch {
    return {};
  }
}

function isFetchFailure(error: unknown): boolean {
  if (error instanceof TypeError) {
    return true;
  }
  if (error instanceof Error && error.message === "fetch failed") {
    return true;
  }
  return false;
}

/** Standard Intercom "Company" on a person requires a Company object + POST /contacts/{id}/companies — not a string on the contact. */
type CompanyListPayload = { data?: Array<{ id?: string; name?: string }> };
type CompanyOrContactPayload = { id?: string };

async function resolveIntercomCompanyRecordId(companyName: string): Promise<string | null> {
  const trimmed = companyName.trim();
  if (!trimmed) return null;

  let searchRes: Response;
  try {
    searchRes = await fetch(
      `https://api.intercom.io/companies?name=${encodeURIComponent(trimmed)}`,
      { headers: intercomHeaders() }
    );
  } catch (e) {
    if (isFetchFailure(e)) {
      console.error("Intercom company search: fetch failed", e);
      return null;
    }
    throw e;
  }

  const listRaw = await parseIntercomJson(searchRes);
  if (searchRes.ok) {
    const list = listRaw as CompanyListPayload;
    const exact =
      list.data?.find(c => c.name?.trim().toLowerCase() === trimmed.toLowerCase()) ?? list.data?.[0];
    if (exact?.id) return exact.id;
  }

  let createRes: Response;
  try {
    createRes = await fetch("https://api.intercom.io/companies", {
      method: "POST",
      headers: intercomHeaders(),
      body: JSON.stringify({ name: trimmed }),
    });
  } catch (e) {
    if (isFetchFailure(e)) {
      console.error("Intercom company create: fetch failed", e);
      return null;
    }
    throw e;
  }

  const created = (await parseIntercomJson(createRes)) as CompanyOrContactPayload & IntercomErrorBody;
  if (!createRes.ok) {
    console.error("Intercom company create failed", created);
    return null;
  }
  return created.id ?? null;
}

async function attachCompanyToIntercomContact(contactId: string, companyName: string): Promise<void> {
  const companyRecordId = await resolveIntercomCompanyRecordId(companyName);
  if (!companyRecordId) return;

  let attachRes: Response;
  try {
    attachRes = await fetch(`https://api.intercom.io/contacts/${contactId}/companies`, {
      method: "POST",
      headers: intercomHeaders(),
      body: JSON.stringify({ id: companyRecordId }),
    });
  } catch (e) {
    if (isFetchFailure(e)) {
      console.error("Intercom attach company: fetch failed", e);
      return;
    }
    throw e;
  }

  if (!attachRes.ok) {
    const err = await parseIntercomJson(attachRes);
    console.error("Intercom attach company failed", err);
  }
}

async function syncEngineerCompanyOnContact(
  contactId: string | undefined,
  userType: string,
  companyName: string | undefined
): Promise<void> {
  if (userType !== "engineer" || !contactId) return;
  const trimmed = companyName?.trim();
  if (!trimmed) return;
  try {
    await attachCompanyToIntercomContact(contactId, trimmed);
  } catch (e) {
    console.error("Intercom sync engineer company:", e);
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

  let user;
  try {
    user = await getCurrentUser(accessToken, null);
  } catch (error) {
    console.error("Intercom intake: getCurrentUser failed:", error);
    return res.status(502).json({ error: "Could not load your profile. Please try again." });
  }

  if (!user?.email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const { email, name } = user;

  try {
    const body = req.body as {
      userType: "vibe_coder" | "engineer";
      vibeTool?: string;
      companyName?: string;
    };

    const { userType, vibeTool, companyName } = body;

    if (!userType || !["vibe_coder", "engineer"].includes(userType)) {
      return res.status(400).json({ error: "userType must be vibe_coder or engineer" });
    }

    const customAttributes: Record<string, string> = {
      user_type: userType,
      source: "dashboard-intake",
    };

    if (userType === "vibe_coder" && vibeTool) {
      customAttributes.vibe_tool = vibeTool;
    }
    if (userType === "engineer" && companyName?.trim()) {
      customAttributes.company = companyName.trim();
    }

    const custom_attributes = customAttributes;

    let response: Response;
    try {
      response = await fetch("https://api.intercom.io/contacts", {
        method: "POST",
        headers: intercomHeaders(),
        body: JSON.stringify({
          role: "user",
          email,
          ...(name && { name }),
          custom_attributes,
        }),
      });
    } catch (error) {
      if (isFetchFailure(error)) {
        console.error("Intercom intake: outbound fetch failed:", error);
        return res.status(503).json({
          error:
            "Could not reach Intercom from the server. Check INTERCOM_ACCESS_TOKEN, firewall, and DNS (try NODE_OPTIONS=--dns-result-order=ipv4first if you see fetch failed).",
          code: "intercom_unreachable",
          ...(process.env.NODE_ENV === "development" && {
            detail: error instanceof Error ? error.message : String(error),
          }),
        });
      }
      throw error;
    }

    const data = await parseIntercomJson(response);

    if (!response.ok) {
      const existingId = getExistingContactIdFromErrorBody(data);
      if (existingId && isDuplicateContactError(response, data)) {
        let updateRes: Response;
        try {
          updateRes = await fetch(`https://api.intercom.io/contacts/${existingId}`, {
            method: "PUT",
            headers: intercomHeaders(),
            body: JSON.stringify({
              custom_attributes,
              ...(name && { name }),
            }),
          });
        } catch (error) {
          if (isFetchFailure(error)) {
            console.error("Intercom intake: update fetch failed:", error);
            return res.status(503).json({
              error:
                "Could not reach Intercom from the server. Check network and INTERCOM_ACCESS_TOKEN.",
              code: "intercom_unreachable",
              ...(process.env.NODE_ENV === "development" && {
                detail: error instanceof Error ? error.message : String(error),
              }),
            });
          }
          throw error;
        }
        const updateData = await parseIntercomJson(updateRes);
        if (!updateRes.ok) {
          return res.status(updateRes.status).json({
            error: updateData?.errors?.[0]?.message || "Intercom API error",
          });
        }
        const updatedContactId =
          (updateData as CompanyOrContactPayload).id ?? existingId;
        await syncEngineerCompanyOnContact(updatedContactId, userType, companyName);
        appendIntakeCompletedCookieOnApiResponse(res, authSub);
        return res.status(200).json({ ...(updateData as object), authSub });
      }

      return res.status(response.status).json({
        error: data?.errors?.[0]?.message || "Intercom API error",
      });
    }

    const createdContactId = (data as CompanyOrContactPayload).id;
    await syncEngineerCompanyOnContact(createdContactId, userType, companyName);
    appendIntakeCompletedCookieOnApiResponse(res, authSub);
    return res.status(200).json({ ...(data as object), authSub });
  } catch (error) {
    console.error("Intercom API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
