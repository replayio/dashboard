import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { GoogleLogo } from "@/pageComponents/login/GoogleLogo";
import { LoginMessaging } from "@/pageComponents/login/LoginMessaging";
import { useState } from "react";

type AuthPending = "google" | "email" | null;

const pillBase =
  "w-full flex items-center justify-center gap-3 rounded-full px-5 py-3.5 font-medium text-sm transition-colors min-h-[52px]";

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
    <div className="w-full max-w-[420px] bg-login-card border border-login-card-border rounded-3xl shadow-lg px-10 pt-10 pb-8 flex flex-col items-center gap-6 text-center">
      <LoginMessaging
        title="Welcome to Replay"
        subtitle={
          <p className="text-login-fg-secondary text-sm mb-0 max-w-[320px] leading-snug">
            Sign up or sign in to continue to Replay
          </p>
        }
      />

      <div className="w-full flex flex-col gap-5">
        <button
          type="button"
          disabled={isBusy}
          onClick={() => {
            if (isBusy) return;
            setPending("google");
            onLogin();
          }}
          className={`${pillBase} bg-login-btn-primary-bg text-login-btn-primary-fg hover:bg-login-btn-primary-hover cursor-pointer disabled:opacity-70 disabled:pointer-events-none disabled:cursor-not-allowed shadow-sm`}
        >
          {pending === "google" ? (
            <>
              <Icon
                className="w-5 h-5 shrink-0 animate-spin text-login-btn-primary-fg"
                type="loading-spinner"
              />
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
          <span className="text-login-fg-secondary text-[10px] font-medium uppercase tracking-wider">
            Or
          </span>
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
          className={`${pillBase} border border-login-btn-outline-border bg-login-input-bg text-login-fg hover:bg-login-btn-outline-hover cursor-pointer disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed`}
        >
          {pending === "email" ? (
            <>
              <Icon
                className="w-5 h-5 shrink-0 animate-spin text-login-fg"
                type="loading-spinner"
              />
              Redirecting…
            </>
          ) : (
            "Continue with email"
          )}
        </button>

        <div className="flex items-center gap-3 w-full">
          <hr className="flex-1 border-login-divider" />
          <span className="text-login-fg-secondary text-[10px] font-medium uppercase tracking-wider">
            Enterprise
          </span>
          <hr className="flex-1 border-login-divider" />
        </div>

        <button
          type="button"
          disabled={isBusy}
          onClick={onSSOLogin}
          className={`${pillBase} border border-login-btn-outline-border bg-login-input-bg text-login-fg hover:bg-login-btn-outline-hover cursor-pointer disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed`}
        >
          Continue with SAML SSO
        </button>
      </div>

      <p className="text-[11px] leading-relaxed text-login-fg-secondary text-center px-1 pt-1">
        By continuing, you agree to the{" "}
        <ExternalLink
          className="text-login-fg-secondary underline underline-offset-2 hover:text-login-fg"
          href="https://www.replay.io/terms-of-service"
        >
          Terms of Service
        </ExternalLink>{" "}
        and{" "}
        <ExternalLink
          className="text-login-fg-secondary underline underline-offset-2 hover:text-login-fg"
          href="https://www.replay.io/privacy-policy"
        >
          Privacy Policy
        </ExternalLink>
        .
      </p>
    </div>
  );
}
