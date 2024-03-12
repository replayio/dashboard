"use client";

import { Icon, IconType } from "@/components/Icon";
import { ModalDialog } from "@/components/ModalDialog";
import { ReactNode, useState } from "react";

export function SettingsDialog<
  Panels extends {
    [id: string]: { children: ReactNode; icon: IconType; label: string };
  }
>({
  defaultPanel,
  onDismiss,
  panels,
  title,
}: {
  defaultPanel: keyof Panels;
  onDismiss: () => void;
  panels: Panels;
  title: string;
}) {
  const [activePanel, setActivePanel] = useState<keyof Panels>(defaultPanel);
  return (
    <ModalDialog onDismiss={onDismiss} title={title}>
      <div className="flex flex-row gap-4">
        <ul className="flex flex-col gap-4 shrink-0">
          {Object.entries(panels).map(([id, { icon, label }]) => (
            <li key={id}>
              <Tab
                icon={icon}
                isActive={activePanel === id}
                label={label}
                onClick={() => setActivePanel(id)}
              />
            </li>
          ))}
        </ul>
        <div className="h-full w-96 h-[250px] overflow-auto">
          {panels[activePanel]?.children ?? null}
        </div>
      </div>
    </ModalDialog>
  );
}

function Tab({
  icon,
  isActive,
  label,
  onClick,
}: {
  icon: IconType;
  isActive: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <div
      className={`flex flex-row items-center gap-2 cursor-pointer ${
        isActive ? "text-sky-500" : ""
      }`}
      onClick={onClick}
    >
      <Icon className="w-6 h-6" type={icon} />
      {label}
    </div>
  );
}
