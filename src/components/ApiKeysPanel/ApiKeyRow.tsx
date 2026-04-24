import { Button } from "@/components/Button";
import { ApiKey } from "@/graphql/types";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { useState } from "react";

export function ApiKeyRow({
  apiKey,
  deleteKey,
}: {
  apiKey: ApiKey;
  deleteKey: (id: string) => void;
}) {
  const [isPending, setIsPending] = useState(false);

  const { confirmationDialog, showConfirmationDialog } = useConfirmDialog(
    (confirmed: boolean) => {
      if (confirmed) {
        setIsPending(true);

        deleteKey(apiKey.id);
      }
    },
    {
      confirmButtonLabel: "Delete API key",
      message: (
        <div className="flex flex-col gap-2">
          <div className="text-rose-500">This action is permanent.</div>
          <div>
            Are you sure you want to delete &quot;
            <strong>{apiKey.label}</strong>&quot;?
          </div>
        </div>
      ),
      title: "Delete API key?",
    }
  );

  return (
    <div className="flex flex-row items-center gap-3 px-3 py-2 rounded-md border border-border bg-card">
      <div className="flex flex-col grow truncate">
        <div className="truncate text-sm font-medium">{apiKey.label}</div>
        {apiKey.maxRecordings !== 0 ? (
          <div className="text-xs text-muted-foreground">
            {apiKey.recordingCount} / {apiKey.maxRecordings} recordings
          </div>
        ) : null}
      </div>
      <Button
        disabled={isPending}
        color="secondary"
        onClick={showConfirmationDialog}
        size="small"
        variant="outline"
      >
        Delete
      </Button>
      {confirmationDialog}
    </div>
  );
}
