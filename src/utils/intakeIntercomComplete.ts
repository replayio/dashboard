import { INTERCOM_CONTACT_ATTR } from "@/constants";

/** Same key as POST /api/intercom uses for the engineer company people attribute. */
export function intercomCompanyNameAttributeKey(): string {
  return process.env.INTERCOM_COMPANY_NAME_ATTRIBUTE?.trim() || INTERCOM_CONTACT_ATTR.companyName;
}

/** Intercom sometimes returns list attributes as objects or non-strings. */
export function stringFromCustomAttribute(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v.trim();
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (typeof v === "object" && v !== null) {
    const o = v as Record<string, unknown>;
    if (typeof o.value === "string") return o.value.trim();
    if (typeof o.name === "string") return o.name.trim();
  }
  return "";
}

export function hasNonEmptyString(v: unknown): boolean {
  return stringFromCustomAttribute(v).length > 0;
}

/**
 * List options in Intercom often store labels like "Software engineer" → software_engineer after normalize.
 * Dashboard intake sends "engineer"; treat common aliases as engineer for completion checks.
 */
export function normalizeUserType(v: unknown): string {
  const raw = stringFromCustomAttribute(v);
  if (!raw) return "";
  const s = raw.toLowerCase().replace(/[\s-]+/g, "_");
  if (s === "vibecoder") return "vibe_coder";
  if (s === "software_engineer") return "engineer";
  if (s.startsWith("software") && s.endsWith("_engineer")) return "engineer";
  if (s === "sw_engineer") return "engineer";
  return s;
}

function valueForPeopleAttribute(attrs: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const v = stringFromCustomAttribute(attrs[key]);
    if (v) return v;
  }
  const want = new Set(keys.map(k => k.toLowerCase()));
  for (const [k, val] of Object.entries(attrs)) {
    if (want.has(k.toLowerCase())) {
      const v = stringFromCustomAttribute(val);
      if (v) return v;
    }
  }
  return "";
}

function userTypeFromAttributes(attrs: Record<string, unknown>): string {
  return valueForPeopleAttribute(attrs, INTERCOM_CONTACT_ATTR.userType, "user_type", "User_type");
}

function vibeToolFromAttributes(attrs: Record<string, unknown>): string {
  return valueForPeopleAttribute(attrs, INTERCOM_CONTACT_ATTR.vibeTool, "vibe_tool", "Vibe_tool");
}

function companyNameFromAttributes(attrs: Record<string, unknown>): string {
  const primary = intercomCompanyNameAttributeKey();
  return valueForPeopleAttribute(attrs, primary, "Company_name", "company_name");
}

/**
 * Intercom is source of truth: complete only when branch-specific data exists.
 * VibeCoder: non-empty vibe_tool. Engineer: non-empty company people attribute (several key spellings).
 */
export function isIntakeComplete(attrs: Record<string, unknown> | undefined): boolean {
  if (!attrs) return false;
  const ut = normalizeUserType(userTypeFromAttributes(attrs));
  if (ut === "vibe_coder") {
    return hasNonEmptyString(vibeToolFromAttributes(attrs));
  }
  if (ut === "engineer") {
    return hasNonEmptyString(companyNameFromAttributes(attrs));
  }
  return false;
}

export type IntercomContactForIntakePick = {
  custom_attributes?: Record<string, unknown>;
  updated_at?: number;
};

function contactUpdatedAt(c: IntercomContactForIntakePick): number {
  return typeof c.updated_at === "number" ? c.updated_at : 0;
}

/** Rough score when no contact is “complete” yet — prefer the record intake/Stripe actually use. */
function intakeSignalsScore(attrs: Record<string, unknown> | undefined): number {
  if (!attrs) return 0;
  let s = 0;
  if (attrs.source === "dashboard-intake") s += 100;
  if (stringFromCustomAttribute(attrs[INTERCOM_CONTACT_ATTR.userType])) s += 40;
  if (stringFromCustomAttribute(attrs[INTERCOM_CONTACT_ATTR.vibeTool])) s += 20;
  const ck = intercomCompanyNameAttributeKey();
  if (
    stringFromCustomAttribute(attrs[ck]) ||
    stringFromCustomAttribute(attrs.company_name) ||
    stringFromCustomAttribute(attrs.Company_name)
  ) {
    s += 20;
  }
  return s;
}

/**
 * Intercom allows duplicate users with the same email. Search order is not stable; pick the contact
 * that already satisfies intake, otherwise the richest / most recently updated profile.
 */
export function pickBestIntercomContactForIntake<T extends IntercomContactForIntakePick>(
  contacts: T[]
): T | null {
  if (contacts.length === 0) return null;
  if (contacts.length === 1) return contacts[0] ?? null;

  const complete = contacts.filter(c => isIntakeComplete(c.custom_attributes));
  if (complete.length > 0) {
    const best = [...complete].sort((a, b) => contactUpdatedAt(b) - contactUpdatedAt(a))[0];
    return best ?? null;
  }

  const best = [...contacts].sort(
    (a, b) =>
      intakeSignalsScore(b.custom_attributes) - intakeSignalsScore(a.custom_attributes) ||
      contactUpdatedAt(b) - contactUpdatedAt(a)
  )[0];
  return best ?? null;
}
