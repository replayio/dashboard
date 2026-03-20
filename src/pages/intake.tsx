"use client";

import { Button } from "@/components/Button";
import { EmptyLayout } from "@/components/EmptyLayout";
import { Input } from "@/components/Input";
import { ReplayLogo } from "@/components/ReplayLogo";
import { SessionContext } from "@/components/SessionContext";
import { COOKIES } from "@/constants";
import { getAuth0SubFromAccessTokenCookie, setCookieValueClient } from "@/utils/cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

/** Same-origin path only — avoids open redirects. */
function getSafeReturnPath(returnTo: unknown): string {
  if (typeof returnTo !== "string") return "/home";
  const t = returnTo.trim();
  if (!t.startsWith("/") || t.startsWith("//") || t.includes("://") || t.includes("\\")) {
    return "/home";
  }
  return t;
}

function completeIntakeAndRedirect(authSub: string, nextPath: string) {
  setCookieValueClient(
    COOKIES.intakeCompleted,
    { userId: authSub },
    { maxAge: 60 * 60 * 24 * 365 }
  );
  window.location.assign(nextPath);
}

const VIBE_TOOLS = ["Lovable", "Base44", "Bolt", "Replit", "Other"] as const;

export default function Page() {
  const router = useRouter();
  const { user } = useContext(SessionContext);
  const [userType, setUserType] = useState<"vibe_coder" | "engineer" | null>(null);
  const [vibeTool, setVibeTool] = useState("");
  const [otherTool, setOtherTool] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** False once we've checked Intercom (or skipped if unauthenticated). */
  const [checkingPriorSubmission, setCheckingPriorSubmission] = useState(true);

  useEffect(() => {
    if (user === null) {
      router.replace("/login?returnTo=/intake");
      return;
    }
    if (!user) return;
    if (!router.isReady) return;

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`/api/intake-status?_=${Date.now()}`, {
          cache: "no-store",
          credentials: "same-origin",
        });
        const data = await res.json();
        if (cancelled) return;
        if (
          res.ok &&
          data.completed === true &&
          typeof data.authSub === "string" &&
          data.authSub.length > 0
        ) {
          completeIntakeAndRedirect(data.authSub, getSafeReturnPath(router.query.returnTo));
          return;
        }
      } catch (e) {
        console.error("Intake prior submission check:", e);
      }
      if (!cancelled) setCheckingPriorSubmission(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [user, router, router.isReady, router.query.returnTo]);

  const canSubmit =
    userType === "vibe_coder"
      ? vibeTool && (vibeTool !== "Other" || otherTool.trim())
      : userType === "engineer"
        ? companyName.trim().length > 0
        : false;

  const handleSubmit = async () => {
    if (!canSubmit || !user) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/intercom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType,
          ...(userType === "vibe_coder" && {
            vibeTool: vibeTool === "Other" ? otherTool.trim() : vibeTool,
          }),
          ...(userType === "engineer" && { companyName: companyName.trim() }),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message =
          (typeof data?.detail === "string" && data.detail) ||
          data?.error ||
          "Something went wrong. Please try again.";
        setError(message);
        setSubmitting(false);
        return;
      }

      // Prefer server-derived `sub` — the access-token cookie is often HttpOnly, so JS cannot read it.
      const authSub =
        (typeof data.authSub === "string" && data.authSub) || getAuth0SubFromAccessTokenCookie();
      if (!authSub) {
        setError("Could not verify session. Please refresh and try again.");
        setSubmitting(false);
        return;
      }

      completeIntakeAndRedirect(authSub, getSafeReturnPath(router.query.returnTo));
    } catch (err) {
      console.error("Intake submit error:", err);
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  if (user === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full w-full max-w-md mx-auto px-6">
        <ReplayLogo className="h-8 w-8 shrink-0 mb-8" color="#F02D5E" />
        <p className="text-muted-foreground text-sm">Redirecting…</p>
      </div>
    );
  }

  if (user && checkingPriorSubmission) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full w-full max-w-md mx-auto px-6">
        <ReplayLogo className="h-8 w-8 shrink-0 mb-8" color="#F02D5E" />
        <p className="text-muted-foreground text-sm">Loading…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full w-full max-w-md mx-auto px-6">
      <ReplayLogo className="h-8 w-8 shrink-0 mb-8" color="#F02D5E" />
      <h1 className="text-2xl font-semibold text-foreground mb-2 text-center">Welcome to Replay</h1>
      <p className="text-muted-foreground text-center mb-8">
        Help us personalize your experience with a quick question.
      </p>

      <div className="w-full space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            How would you describe yourself?
          </label>
          <div className="flex gap-3">
            <Button
              variant={userType === "vibe_coder" ? "solid" : "outline"}
              className="flex-1"
              onClick={() => setUserType("vibe_coder")}
            >
              VibeCoder
            </Button>
            <Button
              variant={userType === "engineer" ? "solid" : "outline"}
              className="flex-1"
              onClick={() => setUserType("engineer")}
            >
              Engineer
            </Button>
          </div>
        </div>

        {userType === "vibe_coder" && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Which tool do you use?
            </label>
            <select
              value={vibeTool}
              onChange={e => setVibeTool(e.target.value)}
              className="block w-full rounded-md border border-input bg-background text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            >
              <option value="">Select a tool</option>
              {VIBE_TOOLS.map(tool => (
                <option key={tool} value={tool}>
                  {tool}
                </option>
              ))}
            </select>
            {vibeTool === "Other" && (
              <Input
                className="mt-2"
                placeholder="Which tool?"
                value={otherTool}
                onChange={v => setOtherTool(v)}
              />
            )}
          </div>
        )}

        {userType === "engineer" && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Company name</label>
            <Input
              placeholder="Your company"
              value={companyName}
              onChange={v => setCompanyName(v)}
            />
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button className="w-full" disabled={!canSubmit || submitting} onClick={handleSubmit}>
          {submitting ? "Submitting..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}

Page.Layout = EmptyLayout;
