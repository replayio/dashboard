import { ExternalLink } from "@/components/ExternalLink";
import { ModalDialog } from "@/components/ModalDialog";
import { ReplayLogo } from "@/components/ReplayLogo";
import Link from "next/link";
import { useEffect } from "react";

export function LaunchReplayModal({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    document.location.href = "replay:library";
  }, []);

  return (
    <ModalDialog
      onDismiss={onDismiss}
      title={
        <div className="flex flex-col gap-4 items-center pt-2">
          <ReplayLogo />
          <div>Launching Replay...</div>
        </div>
      }
    >
      <div className="text-center">
        {"Download it for "}
        <ExternalLink
          href="https://static.replay.io/downloads/replay.dmg"
          title="Download for Mac"
        >
          Mac
        </ExternalLink>
        {", "}
        <ExternalLink
          href="https://static.replay.io/downloads/linux-replay.tar.bz2"
          title="Download for Linux"
        >
          Linux
        </ExternalLink>
        {", or "}
        <ExternalLink
          href="https://static.replay.io/downloads/windows-replay.zip"
          title="Download for Windows"
        >
          Windows
        </ExternalLink>
      </div>
    </ModalDialog>
  );
}
