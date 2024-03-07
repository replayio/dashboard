import { getNonPendingWorkspaces } from "@/graphql/queries/getNonPendingWorkspaces";
import { getCurrentUser } from "@/graphql/queries/getCurrentUser";

export async function LeftNavigation() {
  const workspaces = await getNonPendingWorkspaces();
  const user = await getCurrentUser();
  console.log(user);

  return (
    <div className="flex flex-col h-full px-2 py-1">
      {workspaces.map(({ id, isTest, name }) => (
        <div key={id}>
          {isTest} {name}
        </div>
      ))}
      <div className="grow" />
      <div className="flex flex-row items-center gap-2">
        {user.picture && (
          <img src={user.picture} className="rounded-full w-8 h-8" />
        )}
        <div>{user.name}</div>
      </div>
    </div>
  );
}
