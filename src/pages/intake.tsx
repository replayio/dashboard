import { Icon } from "@/components/Icon";
import { LoginLayout } from "@/components/LoginLayout";
import { ReplayLogo } from "@/components/ReplayLogo";
import { COOKIES } from "@/constants";
import { LoginMessaging } from "@/pageComponents/login/LoginMessaging";
import { setCookieValueClient } from "@/utils/cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const SKIP_NO_RESPONSE_VALUE = "No Response";

function getSafeReturnPath(raw: string | null): string {
  if (!raw || typeof raw !== "string") return "/home";
  const t = raw.trim();
  if (!t.startsWith("/") || t.startsWith("//")) return "/home";
  return t;
}

const pillBase =
  "w-full flex items-center justify-center rounded-full px-5 py-3.5 font-medium text-sm transition-colors min-h-[52px]";

export default function IntakePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = getSafeReturnPath(searchParams?.get("returnTo") ?? null);

  const [mounted, setMounted] = useState(false);
  const [statusLoading, setStatusLoading] = useState(true);
  const [authSub, setAuthSub] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [skipping, setSkipping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Persistent cookie (matches server behavior): the user is "done" with intake going forward.
   * Session cookie: bypass the middleware redirect for this browser session only — the next
   * session will re-check Intercom and show the form again because Company_name is still empty.
   */
  const finishAndRedirect = useCallback(
    (sub?: string | null, opts?: { sessionOnly?: boolean }) => {
      if (sub) {
        setCookieValueClient(
          COOKIES.intakeCompleted,
          { userId: sub },
          opts?.sessionOnly ? undefined : { maxAge: 60 * 60 * 24 * 365 }
        );
      }
      window.location.assign(returnTo);
    },
    [returnTo]
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    (async () => {
      let leaveLoadingVisible = false;
      try {
        const res = await fetch("/api/intake-status", {
          cache: "no-store",
          credentials: "same-origin",
        });
        if (res.status === 401) {
          router.replace(
            `/login?returnTo=${encodeURIComponent(`/intake?returnTo=${encodeURIComponent(returnTo)}`)}`
          );
          return;
        }
        const data = (await res.json()) as { completed?: boolean; authSub?: string | null };
        if (cancelled) return;
        if (data.authSub) setAuthSub(data.authSub);
        if (data.completed) {
          leaveLoadingVisible = true;
          finishAndRedirect(data.authSub);
          return;
        }
      } catch {
        if (!cancelled) setError("Could not verify intake status. You can still submit the form.");
      } finally {
        if (!cancelled && !leaveLoadingVisible) setStatusLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [mounted, router, returnTo, finishAndRedirect]);

  async function postIntercomCompanyName(value: string): Promise<{
    ok: boolean;
    authSub?: string | null;
    unauthorized?: boolean;
    errorMessage?: string;
  }> {
    try {
      const res = await fetch("/api/intercom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ companyName: value }),
      });
      const data = (await res.json()) as { error?: string; authSub?: string | null };
      if (res.status === 401) return { ok: false, unauthorized: true };
      if (!res.ok) return { ok: false, errorMessage: data.error };
      return { ok: true, authSub: data.authSub };
    } catch {
      return { ok: false, errorMessage: "Network error. Please try again." };
    }
  }

  function redirectToLogin() {
    router.replace(
      `/login?returnTo=${encodeURIComponent(`/intake?returnTo=${encodeURIComponent(returnTo)}`)}`
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const companyTrimmed = companyName.trim();
    if (!companyTrimmed) {
      setError("Enter your company name.");
      return;
    }

    setSubmitting(true);
    const result = await postIntercomCompanyName(companyTrimmed);
    setSubmitting(false);
    if (result.unauthorized) return redirectToLogin();
    if (!result.ok) {
      setError(result.errorMessage || "Something went wrong. Please try again.");
      return;
    }
    finishAndRedirect(result.authSub);
  }

  async function handleSkip() {
    setError(null);

    if (dontShowAgain) {
      setSkipping(true);
      const result = await postIntercomCompanyName(SKIP_NO_RESPONSE_VALUE);
      setSkipping(false);
      if (result.unauthorized) return redirectToLogin();
      if (!result.ok) {
        setError(result.errorMessage || "Something went wrong. Please try again.");
        return;
      }
      finishAndRedirect(result.authSub);
      return;
    }

    finishAndRedirect(authSub, { sessionOnly: true });
  }

  if (!mounted || statusLoading) {
    return (
      <div
        className="w-full max-w-[420px] bg-login-card border border-login-card-border rounded-3xl shadow-lg px-10 pt-10 pb-10 flex flex-col items-center gap-6 text-center min-h-[280px] justify-center"
        role="status"
        aria-busy="true"
        aria-live="polite"
      >
        <ReplayLogo className="h-12 w-12 shrink-0" color="#F02D5E" />
        <div className="flex flex-col gap-3 items-center">
          <h2 className="text-2xl font-bold text-login-fg my-0">Signing you in</h2>
          <p className="text-login-fg-secondary text-sm mb-0 max-w-[280px] leading-snug">
            Checking whether we need a few details for your account…
          </p>
          <Icon
            type="loading-spinner"
            className="w-8 h-8 shrink-0 animate-spin text-login-fg-secondary"
            aria-hidden
          />
        </div>
      </div>
    );
  }

  const busy = submitting || skipping;

  return (
    <div className="w-full max-w-[420px] bg-login-card border border-login-card-border rounded-3xl shadow-lg px-10 pt-10 pb-8 flex flex-col items-center gap-6 text-center">
      <LoginMessaging
        title="Quick question"
        subtitle={
          <p className="text-login-fg-secondary text-sm mb-0 max-w-[320px] leading-snug">
            What company are you with? This helps us tailor Replay for your team.
          </p>
        }
      />

      <form className="w-full flex flex-col gap-5 text-left" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="intake-company" className="text-login-fg text-sm font-medium">
            Company name
          </label>
          <input
            id="intake-company"
            type="text"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            placeholder="Acme Inc."
            autoFocus
            className="w-full rounded-xl border border-login-btn-outline-border bg-login-input-bg px-4 py-3 text-sm text-login-fg placeholder:text-login-fg-secondary"
          />
        </div>

        {error && <p className="text-sm text-red-600 m-0">{error}</p>}

        <button
          type="submit"
          disabled={busy || !companyName.trim()}
          className={`${pillBase} bg-login-btn-primary-bg text-login-btn-primary-fg hover:bg-login-btn-primary-hover cursor-pointer disabled:opacity-60 disabled:pointer-events-none shadow-sm`}
        >
          {submitting ? "Saving…" : "Continue"}
        </button>

        <div className="flex flex-col items-center gap-2 pt-1">
          <label
            htmlFor="intake-dont-show"
            className="flex items-center gap-2 text-sm text-login-fg-secondary cursor-pointer select-none"
          >
            <input
              id="intake-dont-show"
              type="checkbox"
              checked={dontShowAgain}
              onChange={e => setDontShowAgain(e.target.checked)}
              className="h-4 w-4 shrink-0 rounded border-login-btn-outline-border text-login-btn-primary-bg focus:ring-login-btn-primary-bg"
            />
            Don&apos;t show this again
          </label>
          <button
            type="button"
            onClick={handleSkip}
            disabled={busy}
            className="text-sm text-login-fg-secondary hover:text-login-fg underline-offset-2 hover:underline cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
          >
            {skipping ? "Skipping…" : "Skip"}
          </button>
        </div>
      </form>
    </div>
  );
}

IntakePage.Layout = LoginLayout;
