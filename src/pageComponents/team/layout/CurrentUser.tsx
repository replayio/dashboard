import { SessionContext } from "@/components/SessionContext";
import Link from "next/link";
import { useContext } from "react";

export function CurrentUser() {
  const { user } = useContext(SessionContext);

  return (
    <Link
      className="flex flex-row items-center gap-3 px-3 py-2 shrink-0 text-white truncate cursor-pointer bg-slate-900 whitespace-nowrap"
      href="/user/settings/account"
    >
      {user.picture && (
        <img
          alt={`${user.name} avatar`}
          className="hidden w-10 h-10 rounded-full md:block"
          referrerPolicy="no-referrer"
          src={user.picture}
        />
      )}
      <div className="truncate">
        <div className="truncate">{user.name}</div>
        <div className="text-sm truncate text-slate-400">View settings</div>
      </div>
    </Link>
  );
}
