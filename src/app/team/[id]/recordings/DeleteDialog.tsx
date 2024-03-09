"use client";

import { Button } from "@/components/Button";
import { useDeleteRecording } from "@/graphql/queries/deleteRecording";
import { WorkspaceRecording } from "@/graphql/types";
import useModalDismissSignal from "@/hooks/useModalDismissSignal";
import { useRouter } from "next/navigation";
import { MouseEvent, useRef, useState } from "react";

export function DeleteDialog({
  onDismiss,
  recording,
}: {
  onDismiss: () => void;
  recording: WorkspaceRecording;
}) {
  const [confirmed, setConfirmed] = useState(false);

  const router = useRouter();

  const modalRef = useRef<HTMLDivElement>(null);

  useModalDismissSignal(modalRef, onDismiss);

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
    <div className="backdrop-blur overflow-y-auto cursor-default fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/50">
      <div
        className="w-96 max-h-full rounded-lg shadow bg-slate-800 flex flex-col gap-4 p-4 pt-2"
        onClick={stopPropagation}
        ref={modalRef}
      >
        <div className="text-xl font-bold">Delete Replay?</div>
        <div className="flex flex-col gap-2">
          <div>This action will permanently delete this replay.</div>
          <div>Are you sure you want to proceed?</div>
        </div>
        <div className="flex flex-row gap-4">
          <Button onClick={onDismiss} variant="outline">
            Cancel
          </Button>
          <Button
            disabled={confirmed}
            onClick={onDeleteClick}
            color="secondary"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

function stopPropagation(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
}
