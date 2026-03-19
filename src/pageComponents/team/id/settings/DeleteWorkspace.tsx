import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { useDeleteWorkspace } from "@/graphql/queries/deleteWorkspace";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteWorkspace({ workspaceId }: { workspaceId: string }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const { deleteWorkspace } = useDeleteWorkspace();

  if (showConfirmation) {
    const handleDelete = async () => {
      setIsPending(true);

      await deleteWorkspace(workspaceId);

      router.replace("/home");
    };

    return (
      <div className="flex flex-col gap-6 py-4" key="confirmation">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <div className="flex flex-row gap-2 items-center text-destructive font-medium mb-2">
            <Icon className="w-5 h-5 shrink-0" type="warning" />
            This action cannot be undone
          </div>
          <p className="text-sm text-muted-foreground">
            This will permanently delete this workspace and all associated replays, API keys,
            sourcemaps, and team member associations.
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <Button disabled={isPending} variant="outline" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button disabled={isPending} color="secondary" onClick={handleDelete}>
            Delete team
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <h2 className="text-sm font-medium mb-1">Delete workspace</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Are you sure you want to delete this team? This action cannot be undone.
        </p>
        <Button color="secondary" onClick={() => setShowConfirmation(true)}>
          Delete team
        </Button>
      </div>
    </div>
  );
}
