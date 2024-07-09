import { SessionContext } from "@/components/SessionContext";
import { useGetWorkspaceMembers } from "@/graphql/queries/getWorkspaceMembers";
import { Workspace } from "@/graphql/types";
import { Billing } from "@/pageComponents/team/id/settings/Billing";
import { DeleteWorkspace } from "@/pageComponents/team/id/settings/DeleteWorkspace";
import { Organization } from "@/pageComponents/team/id/settings/Organization";
import { TeamMembers } from "@/pageComponents/team/id/settings/TeamMembers";
import { WorkspaceApiKeys } from "@/pageComponents/team/id/settings/WorkspaceApiKeys";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect } from "react";

export function WorkspaceSettings({
  route,
  stripeKey,
  workspace,
}: {
  route: string;
  stripeKey: string;
  workspace: Workspace;
}) {
  const workspaceId = workspace.id;

  const { user } = useContext(SessionContext);

  const router = useRouter();

  const { members } = useGetWorkspaceMembers(workspaceId);

  const member = members?.find(({ id }) => id === user?.id);

  const currentUserIsAdmin = member?.roles.includes("admin") == true;
  const currentUserIsDeveloper = member?.roles.includes("debugger") == true;

  let content: ReactNode = null;
  switch (route) {
    case "api-keys": {
      if (currentUserIsAdmin || currentUserIsDeveloper) {
        content = <WorkspaceApiKeys workspaceId={workspaceId} />;
      }
      break;
    }
    case "billing": {
      if (currentUserIsAdmin) {
        content = <Billing stripeKey={stripeKey} workspaceId={workspaceId} />;
      }
      break;
    }
    case "delete": {
      if (currentUserIsAdmin) {
        content = <DeleteWorkspace workspaceId={workspaceId} />;
      }
      break;
    }
    case "members": {
      content = <TeamMembers workspaceId={workspaceId} invitationCode={workspace.invitationCode} />;
      break;
    }
    case "organization": {
      content = <Organization workspaceId={workspaceId} />;
      break;
    }
  }

  useEffect(() => {
    if (content === null) {
      router.replace(`/team/${workspaceId}/settings/members`);
    }
  }, [content, router, workspaceId]);

  return <div className="h-full w-full overflow-auto bg-slate-800 p-2 rounded">{content}</div>;
}
