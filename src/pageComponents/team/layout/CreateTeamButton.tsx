import { Button } from "@/components/Button";
import { CreateTeamDialog } from "@/pageComponents/team/layout/CreateTeamDialog";
import { Icon } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import { useState } from "react";

export function CreateTeamButton({ isInternalUser }: { isInternalUser: boolean }) {
  const [showDialog, setShowDialog] = useState(false);

  const show = () => setShowDialog(true);
  const hide = () => setShowDialog(false);

  return (
    <>
      <Button className="w-full truncate whitespace-nowrap" onClick={show}>
        <Icon className="w-4 h-4 shrink-0" type="create" />
        <div className="hidden md:block">Create new team</div>
        <div className="md:hidden">New team</div>
      </Button>
      {showDialog && <CreateTeamDialog isInternalUser={isInternalUser} onDismiss={hide} />}
    </>
  );
}
