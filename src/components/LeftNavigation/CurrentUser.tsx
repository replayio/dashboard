import { UserSettingsDialog } from "@/components/LeftNavigation/UserSettings/UserSettingsDialog";
import { useCurrentUser } from "@/graphql/queries/useCurrentUser";
import { useState } from "react";

export function CurrentUser() {
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  const { user } = useCurrentUser();

  return (
    <div
      className="flex flex-row items-center gap-4 bg-slate-950 px-4 py-2 text-white cursor-pointer"
      onClick={() => setShowSettingsDialog(true)}
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
      {user && showSettingsDialog && (
        <UserSettingsDialog
          user={user}
          onDismiss={() => setShowSettingsDialog(false)}
        />
      )}
    </div>
  );
}
