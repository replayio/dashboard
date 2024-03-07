import { getNonPendingWorkspaces } from "@/graphql/queries/getNonPendingWorkspaces";

export async function LeftNavigation() {
  const workspaces = await getNonPendingWorkspaces();

  return (
    <ul>
      {workspaces.map(({ id, isTest, name }) => (
        <li key={id}>
          {isTest} {name}
        </li>
      ))}
    </ul>
  );
}
