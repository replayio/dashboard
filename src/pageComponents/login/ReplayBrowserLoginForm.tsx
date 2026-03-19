import { LoginMessaging } from "@/pageComponents/login/LoginMessaging";
import { requestBrowserLogin } from "@/utils/replayBrowser";

export function ReplayBrowserLoginForm() {
  return (
    <div className="w-[420px] bg-login-card border border-login-card-border rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6 text-center">
      <LoginMessaging />
      <button
        onClick={requestBrowserLogin}
        className="w-full px-4 py-3 rounded-lg bg-login-btn-primary-bg text-login-btn-primary-fg font-medium text-sm hover:bg-login-btn-primary-hover transition-colors cursor-pointer"
      >
        Sign in
      </button>
    </div>
  );
}
