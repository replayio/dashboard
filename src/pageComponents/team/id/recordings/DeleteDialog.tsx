import { Button } from "@/components/Button";
import { ModalDialog } from "@/components/ModalDialog";
import { useDeleteRecording } from "@/graphql/queries/useDeleteRecording";
import { WorkspaceRecording } from "@/graphql/types";
import { useState } from "react";

export function DeleteDialog({
  onDismiss,
  recording,
}: {
  onDismiss: () => void;
  recording: WorkspaceRecording;
}) {
  const [confirmed, setConfirmed] = useState(false);

  const { deleteRecording } = useDeleteRecording(async () => {
    // The interaction feels better if you see the "delete" button update to its disabled state for a second before the dialog closes
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onDismiss();
  });

  const onDeleteClick = () => {
    setConfirmed(true);

    deleteRecording(recording.uuid);
  };

  return (
    <ModalDialog onDismiss={onDismiss} title="Delete Replay?">
      <div className="flex flex-col gap-2">
        <div>This action will permanently delete this replay.</div>
        <div>Are you sure you want to proceed?</div>
      </div>
      <div className="flex flex-row gap-4">
        <Button onClick={onDismiss} variant="outline">
          Cancel
        </Button>
        <Button disabled={confirmed} onClick={onDeleteClick} color="secondary">
          Delete
        </Button>
      </div>
    </ModalDialog>
  );
}
