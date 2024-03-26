import { useCurrentUser } from "@/graphql/queries/useCurrentUser";
import Link from "next/link";

export function CurrentUser() {
  const { user } = useCurrentUser();

  return (
    <Link
      className="flex flex-row items-center gap-4 bg-slate-950 !p-2 text-white cursor-pointer rounded"
      href="/user/settings/account"
    >
      {user?.picture && (
        <img
          alt={`${user.name} avatar`}
          className="rounded-full w-10 h-10"
          referrerPolicy="no-referrer"
          src={user.picture}
        />
      )}
      <div>
        <div>{user?.name}</div>
        <div className="text-sm text-slate-400">View settings</div>
      </div>
    </Link>
  );
}
