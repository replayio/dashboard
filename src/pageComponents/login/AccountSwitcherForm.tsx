import { Button } from "@/components/Button";
import { Message } from "@/components/Message";
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
    <Message className="w-96 p-8 gap-8 text-center">
      <ReplayLogo className="text-white min-w-20 min-h-20" />
      <div className="flex flex-col gap-4 w-full items-center">
        <div>
          You are signed in as <strong>{name}</strong>.
        </div>
        <Button onClick={onContinue} size="large">
          {label}
        </Button>
      </div>
      {globalThis.__IS_RECORD_REPLAY_RUNTIME__ || (
        <button className="text-white underline" onClick={onSwitch}>
          Switch accounts
        </button>
      )}
    </Message>
  );
}
