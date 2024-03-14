"use client";

import { Button } from "@/components/Button";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { ApiKey } from "@/graphql/types";
import { useState } from "react";

export function ApiKeyRow({
  apiKey,
  deleteKey,
}: {
  apiKey: ApiKey;
  deleteKey: (id: string) => void;
}) {
  const [isPending, setIsPending] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const onDeleteButtonClick = () => {
    setShowConfirmDialog(true);
  };

  const onConfirmationDialogCancel = () => {
    setShowConfirmDialog(false);
  };

  const onConfirmationDialogConfirm = () => {
    setShowConfirmDialog(false);
    setIsPending(true);

    deleteKey(apiKey.id);
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <div className="truncate">{apiKey.label}</div>
      <div className="text-slate-500 text-sm grow">
        ({apiKey.recordingCount} / {apiKey.maxRecordings} recordings)
      </div>
      <Button
        disabled={isPending}
        color="secondary"
        onClick={onDeleteButtonClick}
        variant="outline"
      >
        Delete
      </Button>
      {showConfirmDialog && (
        <ConfirmationDialog
          confirmButtonLabel="Delete API key"
          message={
            <div className="flex flex-col gap-2">
              <div className="text-rose-500">This action is permanent.</div>
              <div>
                Are you sure you want to delete &quot;
                <strong>{apiKey.label}</strong>&quot;?
              </div>
            </div>
          }
          onCancel={onConfirmationDialogCancel}
          onConfirm={onConfirmationDialogConfirm}
          title="Delete API key?"
        />
      )}
    </div>
  );
}
