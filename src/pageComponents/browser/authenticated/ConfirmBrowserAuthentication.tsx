import { Button } from "@/components/Button";
import { Message } from "@/components/Message";
import { ReplayLogo } from "@/components/ReplayLogo";

export function ConfirmBrowserAuthentication({ userAgent }: { userAgent: string }) {
  const isMacOS = userAgent.includes("Macintosh");

  return (
    <Message className="max-w-96 p-8 gap-8 text-center">
      <ReplayLogo className="text-white min-w-20 min-h-20" />
      <div>You have successfully logged in. You may close this window.</div>
      {isMacOS && (
        <Button onClick={() => (window.location.href = "replay:open")} size="large">
          Open Replay
        </Button>
      )}
    </Message>
  );
}
