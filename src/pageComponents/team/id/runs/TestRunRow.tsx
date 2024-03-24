import { Icon } from "@/components/Icon";
import { TestStatusCapsule } from "@/components/TestStatusCapsule";
import { TestRun } from "@/graphql/types";
import { formatRelativeTime } from "@/utils/number";
import { getTestRunTitle } from "@/utils/test-suites";
import { ReactNode } from "react";

export function TestRunRow({
  currentTestRunId,
  selectTestRun,
  testRun,
}: {
  currentTestRunId: string | undefined;
  selectTestRun: (id: string) => void;
  testRun: TestRun;
}) {
  const isActive = testRun.id === currentTestRunId;

  let icon: ReactNode;
  if (testRun.numFailed > 0) {
    icon = <TestStatusCapsule count={testRun.numFailed} status="failed" />;
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
      data-test-name="TestRuns-Row"
      onClick={() => selectTestRun(testRun.id)}
    >
      <div className="w-6 h-6 shrink-0 flex justify-center">{icon}</div>
      <div className="grow truncate">{getTestRunTitle(testRun)}</div>
      <div className="flex flex-row gap-1 items-center shrink-0 text-sm text-slate-300">
        <Icon className="w-4 h-4" type="clock" />
        {formatRelativeTime(testRun.date)}
      </div>
    </Component>
  );
}
