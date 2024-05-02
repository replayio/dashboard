import { ExternalLink } from "@/components/ExternalLink";
import { ReplayLogo } from "@/components/ReplayLogo";

export function LoginMessaging() {
  return (
    <>
      <ReplayLogo className="text-white min-w-20 min-h-20" />
      <div>
        Replay captures everything you need for the perfect bug report, all in one link.
        <br />
        <ExternalLink className="text-sm mt-2" href="https://www.replay.io">
          Learn more
        </ExternalLink>
      </div>
    </>
  );
}
