import { Button } from "@/components/Button";
import { ModalDialog } from "@/components/ModalDialog";
import { SessionContext } from "@/components/SessionContext";
import { acceptPendingWorkspaceInvitation } from "@/graphql/queries/acceptPendingWorkspaceInvitation";
import { declinePendingWorkspaceInvitation } from "@/graphql/queries/declinePendingWorkspaceInvitation";
import { PendingWorkspace } from "@/graphql/types";
import { useRouter } from "next/navigation";
import { ReactNode, useContext, useState } from "react";

export function PendingInvitationModal({
  isTest,
  workspace,
}: {
  isTest: boolean;
  workspace: PendingWorkspace;
}) {
  const { accessToken } = useContext(SessionContext);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const router = useRouter();

  const acceptInvitation = async () => {
    const success = await acceptPendingWorkspaceInvitation(accessToken, workspace.id);
    if (success) {
      router.push(isTest ? `/team/${workspace.id}/runs` : `/team/${workspace.id}/recordings`);
    }
  };

  const declineInvitation = async () => {
    const success = await declinePendingWorkspaceInvitation(accessToken, workspace.id);
    if (success) {
      router.push("/team/me/recordings");
    }
  };

  let buttons: ReactNode;
  if (showConfirmation) {
    buttons = (
      <>
        <Button key="CancelButton" onClick={() => setShowConfirmation(false)} variant="outline">
          Cancel
        </Button>
        <Button key="ConfirmDeclineButton" color="secondary" onClick={declineInvitation}>
          Decline invitation
        </Button>
      </>
    );
  } else {
    buttons = (
      <>
        <Button key="DeclineButton" color="secondary" onClick={() => setShowConfirmation(true)}>
          Decline
        </Button>
        <Button key="AcceptButton" onClick={acceptInvitation}>
          Accept
        </Button>
      </>
    );
  }

  return (
    <ModalDialog onDismiss={noop} renderInline>
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-col gap-2">
          <div className="text-xl">
            You were invited to <strong>{workspace.name}</strong>
          </div>
          {workspace.inviterEmail ? (
            <div className="text-sm">
              Invited by <a href={`mailto:${workspace.inviterEmail}`}>{workspace.inviterEmail}</a>
            </div>
          ) : null}
        </div>
        {showConfirmation && <div>Are you sure you want to decline this invitation?</div>}
        <div className="flex flex-row space-x-2 text-base">{buttons}</div>
      </div>
    </ModalDialog>
  );
}

function noop() {}
