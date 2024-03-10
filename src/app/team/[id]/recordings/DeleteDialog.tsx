"use client";

import { Button } from "@/components/Button";
import { ModalDialog } from "@/components/ModalDialog";
import { useDeleteRecording } from "@/graphql/queries/deleteRecording";
import { WorkspaceRecording } from "@/graphql/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteDialog({
  onDismiss,
  recording,
}: {
  onDismiss: () => void;
  recording: WorkspaceRecording;
}) {
  const [confirmed, setConfirmed] = useState(false);

  const router = useRouter();

  const { deleteRecording } = useDeleteRecording(async () => {
    setConfirmed(true);

    router.refresh();

    // Deleted recordings aren't immediately removed from the list;
    // wait a second before dismissing the modal to give the server time to update
    await new Promise((resolve) => setTimeout(resolve, 1_000));

    onDismiss();
  });

  const onDeleteClick = () => {
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
