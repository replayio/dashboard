import { SessionContext } from "@/components/SessionContext";
import Link from "next/link";
import { useContext } from "react";

export function CurrentUser() {
  const { user } = useContext(SessionContext);

  return (
    <Link
      className="flex flex-row items-center gap-3 px-3 py-3 text-foreground truncate cursor-pointer shrink-0 border-t border-border whitespace-nowrap hover:bg-accent transition-colors"
      href="/user/settings/account"
    >
      {user.picture && (
        <img
          alt={`${user.name} avatar`}
          className="hidden w-8 h-8 rounded-full md:block"
          referrerPolicy="no-referrer"
          src={user.picture}
        />
      )}
      <div className="truncate">
        <div className="truncate text-sm font-medium">{user.name}</div>
        <div className="text-xs truncate text-muted-foreground">View settings</div>
      </div>
    </Link>
  );
}
