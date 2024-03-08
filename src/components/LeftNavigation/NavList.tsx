import { NavLink } from "@/components/LeftNavigation/NavLink";
import { getCurrentUser } from "@/graphql/queries/getCurrentUser";
import { getNonPendingWorkspaces } from "@/graphql/queries/getNonPendingWorkspaces";
import Image from "next/image";

export async function NavList() {
  const workspaces = await getNonPendingWorkspaces();
  const user = await getCurrentUser();

  return (
    <nav className="flex flex-col h-full bg-slate-800 text-white overflow-auto shrink-0">
      <div className="p-4">
        <Image
          alt="Replay logo"
          className="h-8 w-8"
          height={32}
          src="/images/replay-logo.svg"
          width={32}
        />
      </div>
      <div className="flex flex-col overflow-auto">
        <NavLink id="me" isTest={false} name="Your Library" />
        {workspaces.map(({ id, isTest, name }) => (
          <NavLink id={id} isTest={isTest} key={id} name={name} />
        ))}
      </div>
      <div className="grow" />
      <div className="flex flex-row items-center gap-2 bg-slate-700 px-2 py-1">
        {user.picture && (
          <img src={user.picture} className="rounded-full w-8 h-8" />
        )}
        <div>{user.name}</div>
      </div>
    </nav>
  );
}
