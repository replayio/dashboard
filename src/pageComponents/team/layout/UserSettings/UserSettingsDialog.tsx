import { Account } from "@/pageComponents/team/layout/UserSettings/Account";
import { Legal } from "@/pageComponents/team/layout/UserSettings/Legal";
import { Support } from "@/pageComponents/team/layout/UserSettings/Support";
import { UserApiKeys } from "@/pageComponents/team/layout/UserSettings/UserApiKeys";
import { Icon, IconType } from "@/components/Icon";
import { ModalDialog } from "@/components/ModalDialog";
import { User } from "@/graphql/types";
import { ReactNode, useMemo, useState } from "react";

type Panel = { children: ReactNode; icon: IconType; label: string };

export function UserSettingsDialog({
  onDismiss,
  user,
}: {
  onDismiss: () => void;
  user: User;
}) {
  const panels = useMemo<{ [key: string]: Panel }>(
    () => ({
      account: {
        children: <Account user={user} />,
        icon: "account",
        label: "Account",
      },
      apiKeys: {
        children: <UserApiKeys />,
        icon: "api-keys",
        label: "API keys",
      },
      support: {
        children: <Support />,
        icon: "support",
        label: "Support",
      },
      legal: {
        children: <Legal />,
        icon: "legal",
        label: "Legal",
      },
    }),
    [user]
  );

  const [activePanel, setActivePanel] =
    useState<keyof typeof panels>("account");

  return (
    <ModalDialog onDismiss={onDismiss} title="Settings">
      <div className="flex flex-row gap-4">
        <ul className="flex flex-col gap-4 shrink-0">
          {Object.entries(panels).map(([id, value]) => {
            if (value == null) {
              return null;
            } else {
              return (
                <li key={id}>
                  <div
                    className={`flex flex-row items-center gap-2 cursor-pointer ${
                      activePanel === id ? "text-sky-500" : ""
                    }`}
                    onClick={() => setActivePanel(id)}
                  >
                    <Icon className="w-6 h-6" type={value.icon} />
                    {value.label}
                  </div>
                </li>
              );
            }
          })}
        </ul>
        <div className="w-96 h-[250px] max-h-[250px] overflow-auto">
          {panels[activePanel]?.children ?? null}
        </div>
      </div>
    </ModalDialog>
  );
}
