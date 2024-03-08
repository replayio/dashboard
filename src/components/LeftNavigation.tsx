import { getNonPendingWorkspaces } from "@/graphql/queries/getNonPendingWorkspaces";
import { getCurrentUser } from "@/graphql/queries/getCurrentUser";

// TODO Highlight selected team
export async function LeftNavigation() {
  const workspaces = await getNonPendingWorkspaces();
  const user = await getCurrentUser();

  return (
    <nav className="flex flex-col h-full px-2 py-1 bg-slate-800 text-white overflow-auto shrink-0">
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
    </nav>
  );
}
