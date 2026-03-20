import assert from "assert";
import { ReactNode, useState } from "react";

export function TabContainer({
  children,
  defaultTab,
  tabs,
}: {
  children: (tab: string) => ReactNode;
  defaultTab?: string;
  tabs: string[];
}) {
  assert(tabs.length > 0);

  const [selectedTab, setSelectedTab] = useState<string>(defaultTab ?? tabs[0]!);

  return (
    <div className="flex flex-col">
      <ul className="flex flex-row text-sm bg-muted rounded-md p-1">
        {tabs.map(tab => (
          <Tab
            isActive={selectedTab === tab}
            key={tab}
            label={tab}
            onClick={() => setSelectedTab(tab)}
          />
        ))}
      </ul>
      {children(selectedTab)}
    </div>
  );
}

function Tab({
  isActive,
  label,
  onClick,
}: {
  isActive: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <li
      className={`cursor-pointer inline-flex items-center justify-center px-3 py-1.5 rounded-md transition-all ${
        isActive
          ? "bg-background text-foreground shadow-sm font-medium"
          : "text-muted-foreground hover:text-foreground"
      }`}
      onClick={onClick}
    >
      {label}
    </li>
  );
}
