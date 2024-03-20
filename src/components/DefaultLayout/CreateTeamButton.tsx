import { CreateTeamDialog } from "@/components/DefaultLayout/CreateTeamDialog";
import { Icon } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import { useState } from "react";

export function CreateTeamButton({
  isInternalUser,
}: {
  isInternalUser: boolean;
}) {
  const [showDialog, setShowDialog] = useState(false);

  const show = () => setShowDialog(true);
  const hide = () => setShowDialog(false);

  return (
    <>
      <button
        className="flex flex-row gap-2 items-center text-white px-2 py-1 transition hover:bg-sky-900 underline outline-none"
        onClick={show}
      >
        <Icon className="w-4 h-4" type="create" />
        Create new team
      </button>
      {showDialog && (
        <CreateTeamDialog isInternalUser={isInternalUser} onDismiss={hide} />
      )}
    </>
  );
}
