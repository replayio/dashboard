import { WorkspaceLink } from "@/pageComponents/team/layout/WorkspaceLink";
import { PendingWorkspace, Workspace } from "@/graphql/types";

export function WorkspaceLinkList({
  pendingWorkspaces,
  workspaces,
}: {
  pendingWorkspaces: PendingWorkspace[];
  workspaces: Workspace[];
}) {
  return (
    <>
      <WorkspaceLink
        id="me"
        isPending={false}
        isTest={false}
        name="My Library"
      />
      {pendingWorkspaces?.map(({ id, isTest, name }) => (
        <WorkspaceLink
          id={id}
          isPending={true}
          isTest={isTest}
          key={id}
          name={name}
        />
      ))}
      {workspaces?.map(({ id, isTest, name }) => (
        <WorkspaceLink
          id={id}
          isPending={false}
          isTest={isTest}
          key={id}
          name={name}
        />
      ))}
    </>
  );
}
