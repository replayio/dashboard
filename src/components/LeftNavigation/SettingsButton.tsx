import { IconButton } from "@/components/IconButton";
import { WorkspaceSettingsDialog } from "@/components/LeftNavigation/WorkspaceSettings/WorkspaceSettingsDialog";
import { MouseEvent, useState } from "react";

export function SettingsButton({
  currentUserId,
  id,
  invitationCode,
  name,
}: {
  currentUserId: string | null;
  id: string;
  invitationCode: string;
  name: string;
}) {
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  const onSettingsClick = (event: MouseEvent) => {
    event.preventDefault();
    setShowSettingsDialog(true);
  };

  return (
    <>
      <IconButton onClick={onSettingsClick} iconType="settings" />
      {showSettingsDialog && (
        <WorkspaceSettingsDialog
          currentUserId={currentUserId}
          id={id}
          invitationCode={invitationCode}
          name={name}
          onDismiss={() => setShowSettingsDialog(false)}
        />
      )}
    </>
  );
}
