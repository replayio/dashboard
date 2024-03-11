"use client";

import { CreateTeamDialog } from "@/components/LeftNavigation/CreateTeamDialog";
import { useState } from "react";

export function CreateTeamButton() {
  const [showDialog, setShowDialog] = useState(false);

  const show = () => setShowDialog(true);
  const hide = () => setShowDialog(false);

  return (
    <>
      <button
        className="pl-10 text-white px-4 py-1 underline w-full text-left"
        onClick={show}
      >
        Create new team
      </button>
      {showDialog && <CreateTeamDialog onDismiss={hide} />}
    </>
  );
}
