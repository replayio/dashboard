"use client";

import { LaunchReplayModal } from "@/app/team/[id]/recordings/Recordings/LaunchReplayModal";
import { Button } from "@/components/Button";
import { useState } from "react";

export function LaunchReplayButton() {
  const [showLaunchModal, setShowLaunchModal] = useState(false);

  const hide = () => {
    setShowLaunchModal(false);
  };

  const show = () => {
    setShowLaunchModal(true);
  };

  return (
    <>
      <Button onClick={show}>Launch Replay</Button>
      {showLaunchModal && <LaunchReplayModal onDismiss={hide} />}
    </>
  );
}
