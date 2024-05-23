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
      <ul className="flex flex-row text-sm bg-slate-800 rounded-t">
        {tabs.map(tab => (
          <Tab
            isActive={selectedTab === tab}
            key={tab}
            label={tab}
            onClick={() => setSelectedTab(tab)}
          />
        ))}
        <ul className="grow border-b-2 border-slate-700"></ul>
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
      className={`cursor-pointer inline-block px-2 py-1 rounded-t border-b-2 border-slate-700 ${
        isActive
          ? "border-sky-300 text-sky-300"
          : "hover:border-white text-slate-300 hover:text-white"
      }`}
      onClick={onClick}
    >
      {label}
    </li>
  );
}
