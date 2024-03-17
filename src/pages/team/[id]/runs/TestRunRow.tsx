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

  return (
    <div
      className={`flex flex-row items-center gap-2 whitespace-nowrap text-white p-1 rounded ${
        isActive
          ? "bg-slate-700 cursor-default"
          : "hover:bg-slate-700 cursor-pointer"
      }`}
      onClick={() => selectTestRun(testRun.id)}
    >
      <div className="w-6 h-6 shrink-0 flex justify-center">{icon}</div>
      <div className="grow truncate">{getTestRunTitle(testRun)}</div>
      <div className="flex flex-row gap-1 items-center shrink-0 text-sm text-slate-300">
        <Icon className="w-4 h-4" type="clock" />
        {formatRelativeTime(testRun.date)}
      </div>
    </div>
  );
}
