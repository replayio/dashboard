import { LoginLayout } from "@/components/LoginLayout";
import { COOKIES } from "@/constants";
import { LoginMessaging } from "@/pageComponents/login/LoginMessaging";
import { setCookieValueClient } from "@/utils/cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const VIBE_TOOLS = ["Lovable", "Replit", "Bolt", "Base44", "Other"] as const;

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
  const [userType, setUserType] = useState<"vibe_coder" | "engineer" | null>(null);
  const [tool, setTool] = useState<(typeof VIBE_TOOLS)[number]>("Lovable");
  const [otherTool, setOtherTool] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const finishAndRedirect = useCallback(
    (authSub?: string | null) => {
      if (authSub) {
        setCookieValueClient(
          COOKIES.intakeCompleted,
          { userId: authSub },
          { maxAge: 60 * 60 * 24 * 365 }
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
        if (data.completed) {
          finishAndRedirect(data.authSub);
          return;
        }
      } catch {
        if (!cancelled) setError("Could not verify intake status. You can still submit the form.");
      } finally {
        if (!cancelled) setStatusLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [mounted, router, returnTo, finishAndRedirect]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!userType) {
      setError("Choose VibeCoder or Engineer.");
      return;
    }
    if (userType === "vibe_coder") {
      const resolved = tool === "Other" ? otherTool.trim() : tool;
      if (!resolved) {
        setError("Enter which tool you use.");
        return;
      }
    } else if (!companyName.trim()) {
      setError("Enter your company name.");
      return;
    }

    setSubmitting(true);
    try {
      const body =
        userType === "vibe_coder"
          ? {
              userType: "vibe_coder" as const,
              vibeTool: tool === "Other" ? otherTool.trim() : tool,
            }
          : { userType: "engineer" as const, companyName: companyName.trim() };

      const res = await fetch("/api/intercom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { error?: string; authSub?: string | null };

      if (res.status === 401) {
        router.replace(
          `/login?returnTo=${encodeURIComponent(`/intake?returnTo=${encodeURIComponent(returnTo)}`)}`
        );
        return;
      }
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      finishAndRedirect(data.authSub);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!mounted || statusLoading) {
    return (
      <div className="w-full max-w-[420px] flex flex-col items-center justify-center min-h-[200px] text-login-fg-secondary text-sm">
        Loading…
      </div>
    );
  }

  return (
    <div className="w-full max-w-[420px] bg-login-card border border-login-card-border rounded-3xl shadow-lg px-10 pt-10 pb-8 flex flex-col items-center gap-6 text-center">
      <LoginMessaging
        title="Quick question"
        subtitle={
          <p className="text-login-fg-secondary text-sm mb-0 max-w-[320px] leading-snug">
            Help us tailor Replay — are you more of a VibeCoder or a software engineer?
          </p>
        }
      />

      <form className="w-full flex flex-col gap-5 text-left" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <span className="text-login-fg text-sm font-medium">I identify as</span>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setUserType("vibe_coder")}
              className={`${pillBase} border ${
                userType === "vibe_coder"
                  ? "border-login-btn-primary-bg bg-login-input-bg text-login-fg"
                  : "border-login-btn-outline-border bg-login-input-bg text-login-fg hover:bg-login-btn-outline-hover"
              } cursor-pointer`}
            >
              VibeCoder
            </button>
            <button
              type="button"
              onClick={() => setUserType("engineer")}
              className={`${pillBase} border ${
                userType === "engineer"
                  ? "border-login-btn-primary-bg bg-login-input-bg text-login-fg"
                  : "border-login-btn-outline-border bg-login-input-bg text-login-fg hover:bg-login-btn-outline-hover"
              } cursor-pointer`}
            >
              Software engineer
            </button>
          </div>
        </div>

        {userType === "vibe_coder" && (
          <div className="flex flex-col gap-2">
            <label htmlFor="intake-tool" className="text-login-fg text-sm font-medium">
              Which tools do you use?
            </label>
            <select
              id="intake-tool"
              value={tool}
              onChange={e => setTool(e.target.value as (typeof VIBE_TOOLS)[number])}
              className="w-full rounded-xl border border-login-btn-outline-border bg-login-input-bg px-4 py-3 text-sm text-login-fg"
            >
              {VIBE_TOOLS.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {tool === "Other" && (
              <input
                type="text"
                value={otherTool}
                onChange={e => setOtherTool(e.target.value)}
                placeholder="Tool name"
                className="w-full rounded-xl border border-login-btn-outline-border bg-login-input-bg px-4 py-3 text-sm text-login-fg placeholder:text-login-fg-secondary"
              />
            )}
          </div>
        )}

        {userType === "engineer" && (
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
              className="w-full rounded-xl border border-login-btn-outline-border bg-login-input-bg px-4 py-3 text-sm text-login-fg placeholder:text-login-fg-secondary"
            />
          </div>
        )}

        {error && <p className="text-sm text-red-600 m-0">{error}</p>}

        <button
          type="submit"
          disabled={submitting || !userType}
          className={`${pillBase} bg-login-btn-primary-bg text-login-btn-primary-fg hover:bg-login-btn-primary-hover cursor-pointer disabled:opacity-60 disabled:pointer-events-none shadow-sm`}
        >
          {submitting ? "Saving…" : "Continue"}
        </button>
      </form>
    </div>
  );
}

IntakePage.Layout = LoginLayout;
