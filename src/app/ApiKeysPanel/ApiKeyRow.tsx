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
    <div className="flex flex-row items-center gap-2">
      <Button
        disabled={isPending}
        color="secondary"
        onClick={showConfirmationDialog}
        size="small"
        variant="outline"
      >
        Delete
      </Button>
      <div className="truncate">{apiKey.label}</div>
      <div className="text-slate-500 text-sm grow">
        ({apiKey.recordingCount} / {apiKey.maxRecordings} recordings)
      </div>
      {confirmationDialog}
    </div>
  );
}
