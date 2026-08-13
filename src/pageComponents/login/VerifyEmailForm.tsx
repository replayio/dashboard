import { Icon } from "@/components/Icon";
import { LoginMessaging } from "@/pageComponents/login/LoginMessaging";
import { useSearchParams } from "next/navigation";

const pillBase =
  "w-full flex items-center justify-center gap-3 rounded-full px-5 py-3.5 font-medium text-sm transition-colors min-h-[52px]";

const emailConnection = "Username-Password-Authentication";

function isVerifiedSuccess(searchParams: ReturnType<typeof useSearchParams>): boolean {
  if (!searchParams) return false;
  if (searchParams.get("success") === "true" || searchParams.get("code") === "success") return true;
  const message = searchParams.get("message")?.toLowerCase() ?? "";
  return message.includes("email was verified") || message.includes("email verified");
}

export function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const returnTo = searchParams?.get("returnTo") || "/";
  const verified = isVerifiedSuccess(searchParams);

  function onBackToSignIn() {
    const params = new URLSearchParams({
      connection: emailConnection,
      returnTo,
      origin: location.origin,
      prompt: "login",
    });
    const loginPath = `/api/auth/login?${params}`;
    // Clear any Auth0 session left over from a denied pre-verification login.
    window.location.href = `/api/auth/logout?returnTo=${encodeURIComponent(loginPath)}`;
  }

  return (
    <div
      className="w-full max-w-[480px] bg-login-card border border-login-card-border rounded-3xl shadow-lg px-10 pt-10 pb-8 flex flex-col items-center gap-6 text-center"
      data-testid="verify-email-page"
    >
      <LoginMessaging
        title={verified ? "Email verified" : "Check your email"}
        subtitle={
          <p className="text-login-fg-secondary text-sm mb-0 max-w-[360px] leading-snug">
            {verified
              ? "Your email address is confirmed. Sign in to continue to Replay."
              : "We sent you a verification link. Open it to confirm your email address, then come back here and sign in."}
          </p>
        }
      />

      <div
        className="w-14 h-14 flex items-center justify-center rounded-2xl bg-login-input-bg border border-login-card-border text-login-fg-secondary"
        aria-hidden
      >
        {verified ? (
          <Icon className="w-6 h-6" type="step-complete" />
        ) : (
          <Icon className="w-6 h-6" type="email" />
        )}
      </div>

      {!verified && (
        <div className="w-full text-left rounded-2xl border border-login-card-border bg-login-input-bg px-5 py-4 text-sm text-login-fg leading-relaxed">
          <ol className="m-0 pl-5 space-y-2">
            <li>Check your inbox for an email from Replay.</li>
            <li>
              Click <strong>Verify email address</strong> in that email.
            </li>
            <li>Return here and sign in with the same email and password.</li>
          </ol>
        </div>
      )}

      <button
        type="button"
        onClick={onBackToSignIn}
        className={`${pillBase} bg-login-btn-primary-bg text-login-btn-primary-fg hover:bg-login-btn-primary-hover cursor-pointer shadow-sm`}
        data-testid="verify-email-sign-in"
      >
        {verified ? "Sign in" : "Back to sign in"}
      </button>

      {!verified && (
        <p className="text-[11px] leading-relaxed text-login-fg-secondary text-center px-1">
          Didn&apos;t get the email? Check spam and wait a few minutes. Once you&apos;ve clicked the
          link, use <strong>Back to sign in</strong> above. Questions?{" "}
          <a
            className="text-login-fg-secondary underline underline-offset-2 hover:text-login-fg"
            href="mailto:support@replay.io"
          >
            support@replay.io
          </a>
        </p>
      )}
    </div>
  );
}
