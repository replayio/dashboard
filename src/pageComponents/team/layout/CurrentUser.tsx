import { SessionContext } from "@/components/SessionContext";
import Link from "next/link";
import { useContext } from "react";

export function CurrentUser() {
  const { user } = useContext(SessionContext);

  return (
    <Link
      className="flex flex-row items-center gap-4 bg-slate-950 !p-2 text-white cursor-pointer whitespace-nowrap rounded truncate"
      href="/user/settings/account"
    >
      {user?.picture && (
        <img
          alt={`${user.name} avatar`}
          className="rounded-full w-10 h-10 hidden md:block"
          referrerPolicy="no-referrer"
          src={user.picture}
        />
      )}
      <div className="truncate">
        <div className="truncate">{user?.name}</div>
        <div className="truncate text-sm text-slate-400">View settings</div>
      </div>
    </Link>
  );
}
