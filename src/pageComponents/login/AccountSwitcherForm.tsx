import { ReplayLogo } from "@/components/ReplayLogo";

export function AccountSwitcherForm({
  name,
  label,
  onContinue,
  onSwitch,
}: {
  name: string;
  label: string;
  onContinue: () => void;
  onSwitch: () => void;
}) {
  return (
    <div className="w-[420px] bg-login-card border border-login-card-border rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6 text-center">
      <ReplayLogo className="min-w-12 min-h-12" color="#F02D5E" />
      <div className="flex flex-col gap-1 items-center">
        <h2 className="text-2xl font-bold text-login-fg my-0">Welcome Back</h2>
        <p className="text-login-fg-secondary text-sm mb-0">
          You are signed in as <strong className="text-login-fg">{name}</strong>
        </p>
      </div>

      <button
        onClick={onContinue}
        className="w-full px-4 py-4 text-center rounded-lg bg-login-btn-primary-bg text-login-btn-primary-fg font-medium text-md hover:bg-login-btn-primary-hover transition-colors cursor-pointer"
      >
        {label}
      </button>

      {globalThis.__IS_RECORD_REPLAY_RUNTIME__ || (
        <button
          className=" text-login-fg-secondary text-sm hover:text-login-fg underline transition-colors cursor-pointer"
          onClick={onSwitch}
        >
          Switch accounts
        </button>
      )}
    </div>
  );
}
