import { Icon } from "@/components/Icon";
import { TestSuiteTestSummary } from "@/graphql/types";
import { ReactNode } from "react";

export function TestSummaryRow({
  currentTestSummaryId,
  selectTestSummary,
  showFlakyRate,
  testSummary,
}: {
  currentTestSummaryId: string | undefined;
  selectTestSummary: (id: string) => void;
  showFlakyRate: boolean;
  testSummary: TestSuiteTestSummary;
}) {
  const isActive = testSummary.id === currentTestSummaryId;

  let icon: ReactNode = null;
  if (showFlakyRate) {
    icon = (
      <div className="flex items-center justify-center bg-yellow-500 text-black w-full h-6 rounded-md shrink-0 text-xs">
        {Math.round(testSummary.stats.flakyRate * 100)}%
      </div>
    );
  } else if (testSummary.stats.failureRate > 0) {
    icon = (
      <div className="flex items-center justify-center bg-rose-600 text-white w-full h-6 rounded-md shrink-0 text-xs">
        {Math.round(testSummary.stats.failureRate * 100)}%
      </div>
    );
  } else {
    icon = (
      <Icon
        className="text-green-500 w-6 h-6 shrink-0"
        type="passing-test-run"
      />
    );
  }

  const Component = isActive ? "div" : "button";

  return (
    <Component
      className={`w-full flex flex-row items-center gap-2 whitespace-nowrap text-white px-2 py-1 outline-0 ${
        isActive
          ? "bg-slate-700 cursor-default"
          : "focus:text-sky-500 hover:bg-slate-700 cursor-pointer"
      }`}
      data-selected={isActive || undefined}
      data-test-name="TestSummary-Row"
      onClick={() => {
        selectTestSummary(testSummary.id);
      }}
    >
      <div className="w-10 h-6 shrink-0 flex justify-center">{icon}</div>
      <div className="truncate">{testSummary.title}</div>
    </Component>
  );
}
