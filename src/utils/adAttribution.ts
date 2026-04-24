// first-touch capture of paid-ad click IDs + utm params. writes a
// .replay.io cookie so the value survives the replay.io -> app.replay.io
// subdomain jump (localStorage is origin-scoped and wouldn't). landing-page
// writes the same cookie for users who land on the marketing site first;
// dashboard both reads the cookie AND writes it so a direct ad -> app.replay.io
// hit is still captured.

const COOKIE_NAME = "replay-ad-attribution";
// 90 days - matches the CVR window Tom called out for paid-ad platforms.
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;

export type AdAttribution = {
  li_fat_id?: string;
  twclid?: string;
  rdt_cid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

const AD_ATTR_KEYS = [
  "li_fat_id",
  "twclid",
  "rdt_cid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

// use Domain=.replay.io only when we're actually on a replay.io host,
// so preview deploys (*.vercel.app) and localhost still write a working
// host-only cookie.
function cookieDomainAttribute(): string {
  if (typeof window === "undefined") return "";
  return window.location.hostname.endsWith("replay.io") ? "; Domain=.replay.io" : "";
}

function cookieSecureAttribute(): string {
  if (typeof window === "undefined") return "";
  return window.location.protocol === "https:" ? "; Secure" : "";
}

export function captureAdAttribution(): void {
  if (typeof window === "undefined") return;
  if (readAdAttribution()) return;

  const params = new URLSearchParams(window.location.search);
  const captured: AdAttribution = {};
  for (const k of AD_ATTR_KEYS) {
    const v = params.get(k);
    if (v) captured[k] = v;
  }
  if (Object.keys(captured).length === 0) return;

  const value = encodeURIComponent(JSON.stringify(captured));
  document.cookie =
    `${COOKIE_NAME}=${value}` +
    `; Path=/` +
    `; Max-Age=${COOKIE_MAX_AGE_SECONDS}` +
    `; SameSite=Lax` +
    cookieDomainAttribute() +
    cookieSecureAttribute();
}

export function readAdAttribution(): AdAttribution | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|;\\s*)" + COOKIE_NAME + "=([^;]+)")
  );
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1])) as AdAttribution;
  } catch {
    return null;
  }
}

export function clearAdAttribution(): void {
  if (typeof document === "undefined") return;
  document.cookie =
    `${COOKIE_NAME}=` +
    `; Path=/` +
    `; Max-Age=0` +
    `; SameSite=Lax` +
    cookieDomainAttribute() +
    cookieSecureAttribute();
}
