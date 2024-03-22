import { Button } from "@/components/Button";
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
      <Button className="w-full" onClick={show}>
        <Icon className="w-4 h-4" type="create" />
        Create new team
      </Button>
      {showDialog && (
        <CreateTeamDialog isInternalUser={isInternalUser} onDismiss={hide} />
      )}
    </>
  );
}
