import { Icon } from "@/components/Icon";
import { GoogleLogo } from "@/pageComponents/login/GoogleLogo";
import { LoginMessaging } from "@/pageComponents/login/LoginMessaging";
import { useState } from "react";

type AuthPending = "google" | "email" | null;

export function DefaultLoginForm({
  onLogin,
  onEmailLogin,
  onSSOLogin,
}: {
  onLogin: () => void;
  onEmailLogin: () => void;
  onSSOLogin: () => void;
}) {
  const [pending, setPending] = useState<AuthPending>(null);
  const isBusy = pending !== null;

  return (
    <div className="w-[420px] bg-login-card border border-login-card-border rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6 text-center">
      <LoginMessaging />

      <button
        type="button"
        disabled={isBusy}
        onClick={() => {
          if (isBusy) return;
          setPending("google");
          onLogin();
        }}
        className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-lg border border-login-btn-outline-border bg-login-input-bg text-login-fg font-medium text-md hover:bg-login-btn-outline-hover transition-colors cursor-pointer disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed"
      >
        {pending === "google" ? (
          <>
            <Icon className="w-5 h-5 shrink-0 animate-spin" type="loading-spinner" />
            Redirecting…
          </>
        ) : (
          <>
            <GoogleLogo /> Continue with Google
          </>
        )}
      </button>

      <div className="flex items-center gap-3 w-full">
        <hr className="flex-1 border-login-divider" />
        <span className="text-login-fg-secondary text-xs">Or continue with email</span>
        <hr className="flex-1 border-login-divider" />
      </div>

      <button
        type="button"
        disabled={isBusy}
        onClick={() => {
          if (isBusy) return;
          setPending("email");
          onEmailLogin();
        }}
        className="w-full px-4 py-4 text-center rounded-lg bg-login-btn-primary-bg text-login-btn-primary-fg font-medium text-md hover:bg-login-btn-primary-hover transition-colors cursor-pointer disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[56px]"
      >
        {pending === "email" ? (
          <>
            <Icon className="w-5 h-5 shrink-0 animate-spin" type="loading-spinner" />
            Redirecting…
          </>
        ) : (
          "Continue with Email"
        )}
      </button>

      <div className="flex items-center gap-3 w-full">
        <hr className="flex-1 border-login-divider" />
        <span className="text-login-fg-secondary text-xs">Enterprise</span>
        <hr className="flex-1 border-login-divider" />
      </div>

      <button
        type="button"
        disabled={isBusy}
        onClick={onSSOLogin}
        className="w-full px-4 py-4 text-center rounded-lg border border-login-btn-outline-border text-login-fg font-medium text-md hover:bg-login-btn-outline-hover transition-colors cursor-pointer disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed"
      >
        Continue with SAML SSO
      </button>
    </div>
  );
}
