import { TestRun } from "@/graphql/types";
import { getBackgroundColorClassName } from "@/utils/test-suites";

export function TestRunStatsSummary({ testRun }: { testRun: TestRun }) {
  return (
    <>
      {testRun.numFailed > 0 && (
        <div
          className={`flex items-center justify-center w-6 h-6 rounded shrink-0 text-xs ${getBackgroundColorClassName(
            "failed"
          )}`}
        >
          {testRun.numFailed}
        </div>
      )}
      {testRun.numFlaky > 0 && (
        <div
          className={`flex items-center justify-center w-6 h-6 rounded shrink-0 text-xs ${getBackgroundColorClassName(
            "flaky"
          )}`}
        >
          {testRun.numFlaky}
        </div>
      )}
      {testRun.numPassed > 0 && (
        <div
          className={`flex items-center justify-center w-6 h-6 rounded shrink-0 text-xs ${getBackgroundColorClassName(
            "passed"
          )}`}
        >
          {testRun.numPassed}
        </div>
      )}
    </>
  );
}
