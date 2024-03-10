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
        <Link
          href="https://static.replay.io/downloads/replay.dmg"
          rel="noopener noreferrer"
          target="_blank"
          title="Download for Mac"
        >
          Mac
        </Link>
        {", "}
        <Link
          href="https://static.replay.io/downloads/linux-replay.tar.bz2"
          rel="noopener noreferrer"
          target="_blank"
          title="Download for Linux"
        >
          Linux
        </Link>
        {", or "}
        <Link
          href="https://static.replay.io/downloads/windows-replay.zip"
          rel="noopener noreferrer"
          target="_blank"
          title="Download for Windows"
        >
          Windows
        </Link>
      </div>
    </ModalDialog>
  );
}
