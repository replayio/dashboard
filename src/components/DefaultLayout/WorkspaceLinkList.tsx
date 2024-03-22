import { WorkspaceLink } from "@/components/DefaultLayout/WorkspaceLink";
import { Workspace } from "@/graphql/types";

export function WorkspaceLinkList({ workspaces }: { workspaces: Workspace[] }) {
  return (
    <>
      <WorkspaceLink id="me" isTest={false} name="My Library" />
      {workspaces?.map(({ id, isTest, name }) => (
        <WorkspaceLink id={id} isTest={isTest} key={id} name={name} />
      ))}
    </>
  );
}
