import { NavLink } from "@/components/LeftNavigation/NavLink";
import { getCurrentUserServer } from "@/graphql/queries/getCurrentUser";
import { getNonPendingWorkspacesServer } from "@/graphql/queries/getNonPendingWorkspaces";
import Image from "next/image";
import Link from "next/link";

export async function NavList() {
  const workspaces = await getNonPendingWorkspacesServer();
  const user = await getCurrentUserServer();

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
        <button className="pl-10 text-white px-4 py-1 underline w-full text-left">
          Create new team
        </button>
      </div>
      <div className="grow" />
      <button className="flex flex-row items-center gap-4 bg-slate-950 px-4 py-2 text-white cursor-pointer">
        {user.picture && (
          <img
            alt={`${user.name} avatar`}
            className="rounded-full w-10 h-10"
            src={user.picture}
          />
        )}
        <div>
          <div>{user.name}</div>
          <div className="text-sm text-slate-400">View settings</div>
        </div>
      </button>
    </nav>
  );
}
