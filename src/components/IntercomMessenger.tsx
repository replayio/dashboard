import { SessionContext } from "@/components/SessionContext";
import Intercom from "@intercom/messenger-js-sdk";
import { useContext, useEffect } from "react";

const APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

/** Refresh the JWT this many seconds before it expires. */
const REFRESH_BUFFER_SECONDS = 5 * 60;
/** Floor for refresh scheduling — guards against runaway loops if the clock skews. */
const MIN_REFRESH_DELAY_MS = 60_000;

type JwtResponse = { jwt: string; expiresAt: number } | { jwt: null };

async function fetchJwt(): Promise<JwtResponse | null> {
  try {
    const res = await fetch("/api/intercom/user-jwt", { credentials: "same-origin" });
    if (!res.ok) return null;
    return (await res.json()) as JwtResponse;
  } catch {
    return null;
  }
}

/**
 * Mounts the Intercom Messenger (chat widget). Identifies the viewer when a
 * session is present, falls back to anonymous chat otherwise.
 *
 * Identity Verification: when INTERCOM_IDENTITY_VERIFICATION_SECRET is set on
 * the server, /api/intercom/user-jwt issues a short-lived JWT that we pass as
 * `intercom_user_jwt`. The token is refreshed in-place (via Intercom('update'))
 * before it expires so long-lived dashboard sessions stay verified.
 *
 * No-ops entirely when NEXT_PUBLIC_INTERCOM_APP_ID is unset (e.g. local dev).
 */
export function IntercomMessenger() {
  const session = useContext(SessionContext);
  const user = session?.user ?? null;

  useEffect(() => {
    if (!APP_ID) return;

    let cancelled = false;
    let refreshTimer: ReturnType<typeof setTimeout> | undefined;

    async function bootOrRefresh(isRefresh: boolean) {
      let token: string | null = null;
      let expiresAt: number | null = null;

      if (user) {
        const data = await fetchJwt();
        if (data && "expiresAt" in data) {
          token = data.jwt;
          expiresAt = data.expiresAt;
        }
      }

      if (cancelled) return;

      const settings = {
        app_id: APP_ID!,
        ...(user && {
          user_id: user.id,
          email: user.email,
          name: user.name || undefined,
        }),
        ...(token && { intercom_user_jwt: token }),
      };

      if (isRefresh && typeof window.Intercom === "function") {
        window.Intercom("update", settings);
      } else {
        Intercom(settings);
      }

      if (token && expiresAt) {
        const nowSeconds = Math.floor(Date.now() / 1000);
        const refreshInMs = Math.max(
          (expiresAt - nowSeconds - REFRESH_BUFFER_SECONDS) * 1000,
          MIN_REFRESH_DELAY_MS
        );
        refreshTimer = setTimeout(() => {
          void bootOrRefresh(true);
        }, refreshInMs);
      }
    }

    void bootOrRefresh(false);

    return () => {
      cancelled = true;
      if (refreshTimer) clearTimeout(refreshTimer);
      if (typeof window !== "undefined" && typeof window.Intercom === "function") {
        window.Intercom("shutdown");
      }
    };
  }, [user]);

  return null;
}
