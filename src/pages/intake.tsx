import { Icon } from "@/components/Icon";
import { LoginLayout } from "@/components/LoginLayout";
import { ReplayLogo } from "@/components/ReplayLogo";
import { COOKIES } from "@/constants";
import { LoginMessaging } from "@/pageComponents/login/LoginMessaging";
import { setCookieValueClient } from "@/utils/cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const VIBE_TOOLS = ["Lovable", "Replit", "Bolt", "Base44", "Other"] as const;

function buildVibeToolString(
  selected: Set<(typeof VIBE_TOOLS)[number]>,
  otherTool: string
): string | null {
  const parts: string[] = [];
  for (const t of VIBE_TOOLS) {
    if (t === "Other") continue;
    if (selected.has(t)) parts.push(t);
  }
  if (selected.has("Other")) {
    const custom = otherTool.trim();
    if (custom) parts.push(custom);
  }
  if (parts.length === 0) return null;
  return parts.join(", ");
}

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
  const [selectedTools, setSelectedTools] = useState<Set<(typeof VIBE_TOOLS)[number]>>(
    () => new Set()
  );
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!userType) {
      setError("Choose VibeCoder or Engineer.");
      return;
    }
    if (userType === "vibe_coder") {
      const vibeStr = buildVibeToolString(selectedTools, otherTool);
      if (!vibeStr) {
        if (selectedTools.has("Other") && !otherTool.trim()) {
          setError("Add a tool name for Other, or uncheck it.");
        } else {
          setError("Select at least one tool.");
        }
        return;
      }
    } else if (!companyName.trim()) {
      setError("Enter your company name.");
      return;
    }

    setSubmitting(true);
    try {
      const companyTrimmed = companyName.trim();
      const body =
        userType === "vibe_coder"
          ? {
              userType: "vibe_coder" as const,
              vibeTool: buildVibeToolString(selectedTools, otherTool)!,
              ...(companyTrimmed ? { companyName: companyTrimmed } : {}),
            }
          : { userType: "engineer" as const, companyName: companyTrimmed };

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
          <fieldset className="flex flex-col gap-3 border-0 p-0 m-0 min-w-0">
            <legend className="text-login-fg text-sm font-medium mb-0.5">
              Which tools do you use?
            </legend>
            <div className="flex flex-col gap-2.5">
              {VIBE_TOOLS.map(t => {
                const id = `intake-tool-${t}`;
                return (
                  <label
                    key={t}
                    htmlFor={id}
                    className="flex items-center gap-3 cursor-pointer text-sm text-login-fg rounded-xl border border-login-btn-outline-border bg-login-input-bg px-4 py-3 focus-within:ring-2 focus-within:ring-login-btn-primary-bg"
                  >
                    <input
                      id={id}
                      type="checkbox"
                      checked={selectedTools.has(t)}
                      onChange={() => {
                        setSelectedTools(prev => {
                          const next = new Set(prev);
                          if (next.has(t)) next.delete(t);
                          else next.add(t);
                          return next;
                        });
                      }}
                      className="h-4 w-4 shrink-0 rounded border-login-btn-outline-border text-login-btn-primary-bg focus:ring-login-btn-primary-bg"
                    />
                    <span>{t}</span>
                  </label>
                );
              })}
            </div>
            {selectedTools.has("Other") && (
              <input
                type="text"
                value={otherTool}
                onChange={e => setOtherTool(e.target.value)}
                placeholder="Tool name"
                aria-label="Other tool name"
                className="w-full rounded-xl border border-login-btn-outline-border bg-login-input-bg px-4 py-3 text-sm text-login-fg placeholder:text-login-fg-secondary"
              />
            )}
          </fieldset>
        )}

        {(userType === "vibe_coder" || userType === "engineer") && (
          <div className="flex flex-col gap-2">
            <label htmlFor="intake-company" className="text-login-fg text-sm font-medium">
              Company name
              {userType === "vibe_coder" && (
                <span className="text-login-fg-secondary font-normal"> (optional)</span>
              )}
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
