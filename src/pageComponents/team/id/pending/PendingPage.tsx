import { Button } from "@/components/Button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SessionContext } from "@/components/SessionContext";
import { acceptPendingWorkspaceInvitation } from "@/graphql/queries/acceptPendingWorkspaceInvitation";
import { declinePendingWorkspaceInvitation } from "@/graphql/queries/declinePendingWorkspaceInvitation";
import { usePendingWorkspaces } from "@/graphql/queries/usePendingWorkspaces";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export function PendingPage({ isTest, workspaceId }: { isTest: boolean; workspaceId: string }) {
  const { accessToken } = useContext(SessionContext);

  const router = useRouter();

  const { isLoading, workspaces } = usePendingWorkspaces();
  const workspace = workspaces?.find(({ id }) => id === workspaceId);

  const { confirmationDialog, showConfirmationDialog } = useConfirmDialog(
    async (confirmed: boolean) => {
      if (confirmed) {
        const success = await declinePendingWorkspaceInvitation(accessToken, workspaceId);
        if (success) {
          router.push("/team/me/recordings");
        }
      }
    },
    {
      confirmButtonLabel: "Decline invitation",
      message: "Are you sure you want to decline this invitation?",
      title: "Confirm",
    }
  );

  if (isLoading || !workspace) {
    return <LoadingSpinner />;
  }

  const acceptInvitation = async () => {
    const success = await acceptPendingWorkspaceInvitation(accessToken, workspaceId);
    if (success) {
      router.push(isTest ? `/team/${workspaceId}/runs` : `/team/${workspaceId}/recordings`);
    }
  };

  return (
    <div className="bg-slate-800 text-white m-2 p-2 rounded overflow-auto flex flex-col gap-2 relative">
      <div className="flex flex-col space-y-1">
        <div>
          You were invited to <strong>{workspace.name}</strong> workspace
          {workspace.inviterEmail ? (
            <>
              {" "}
              by <a href={`mailto:${workspace.inviterEmail}`}>{workspace.inviterEmail}</a>
            </>
          ) : null}
          .
        </div>
      </div>
      <div className="flex flex-row space-x-2 text-base">
        <Button onClick={acceptInvitation}>Accept</Button>
        <Button color="secondary" onClick={showConfirmationDialog}>
          Decline
        </Button>
      </div>
      {confirmationDialog}
    </div>
  );
}
