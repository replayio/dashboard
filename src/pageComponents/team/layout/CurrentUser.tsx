import { Button } from "@/components/Button";
import { useCurrentUser } from "@/graphql/queries/useCurrentUser";
import { UserSettingsDialog } from "@/pageComponents/team/layout/UserSettings/UserSettingsDialog";
import { useState } from "react";

export function CurrentUser() {
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  const { user } = useCurrentUser();

  return (
    <Button
      className="flex flex-row items-center gap-4 bg-slate-950 !p-2 text-white cursor-pointer rounded"
      onClick={() => setShowSettingsDialog(true)}
      variant="transparent"
    >
      {user?.picture && (
        <img
          alt={`${user.name} avatar`}
          className="rounded-full w-10 h-10"
          referrerPolicy="no-referrer"
          src={user.picture}
        />
      )}
      <div className="font-normal text-left">
        <div>{user?.name}</div>
        <div className="text-sm text-slate-400">View settings</div>
      </div>
      {user && showSettingsDialog && (
        <UserSettingsDialog
          user={user}
          onDismiss={() => setShowSettingsDialog(false)}
        />
      )}
    </Button>
  );
}
