import { Workspace } from "@/graphql/types";
import { Billing } from "@/pageComponents/team/id/settings/Billing";
import { DeleteWorkspace } from "@/pageComponents/team/id/settings/DeleteWorkspace";
import { Organization } from "@/pageComponents/team/id/settings/Organization";
import { TeamMembers } from "@/pageComponents/team/id/settings/TeamMembers";
import { WorkspaceApiKeys } from "@/pageComponents/team/id/settings/WorkspaceApiKeys";
import { ReactNode } from "react";

export function WorkspaceSettings({
  route,
  stripeKey,
  workspace,
}: {
  route: string;
  stripeKey: string;
  workspace: Workspace;
}) {
  let content: ReactNode = null;
  switch (route) {
    case "api-keys": {
      content = <WorkspaceApiKeys workspaceId={workspace.id} />;
      break;
    }
    case "billing": {
      content = <Billing stripeKey={stripeKey} workspaceId={workspace.id} />;
      break;
    }
    case "delete": {
      content = <DeleteWorkspace id={workspace.id} />;
      break;
    }
    case "members": {
      content = (
        <TeamMembers
          id={workspace.id}
          invitationCode={workspace.invitationCode}
        />
      );
      break;
    }
    case "organization": {
      content = <Organization id={workspace.id} />;
      break;
    }
  }

  return (
    <div className="h-full w-full overflow-auto bg-slate-800 p-2 rounded">
      {content}
    </div>
  );
}
