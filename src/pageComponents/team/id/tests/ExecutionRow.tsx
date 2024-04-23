import { Icon, IconType } from "@/components/Icon";
import { TestSuiteTestExecution } from "@/graphql/types";
import { RecordingRow } from "@/pageComponents/team/id/tests/RecordingRow";
import { formatRelativeTime } from "@/utils/number";

export function ExecutionRow({ testExecution }: { testExecution: TestSuiteTestExecution }) {
  let iconType: IconType;
  switch (testExecution.result) {
    case "failed":
      iconType = "failed-test";
      break;
    case "flaky":
      iconType = "flaky-test";
      break;
    case "passed":
      iconType = "passing-test";
      break;
  }

  return (
    <div className="flex flex-col" data-test-name="TestExecution-Row">
      <div className="flex flex-row items-center gap-2 mx-2">
        <div className="grow truncate">{testExecution.commitTitle || "Test"}</div>
        {testExecution.commitAuthor && (
          <div className="flex flex-row items-center gap-1 text-sm text-center">
            <Icon className="w-4 h-4" type="account" />
            {testExecution.commitAuthor}
          </div>
        )}
        <div className="flex flex-row gap-1 items-center shrink-0 text-sm" suppressHydrationWarning>
          <Icon className="w-3 h-3" type="clock" />
          {formatRelativeTime(testExecution.createdAt)} ago
        </div>
      </div>
      <div className="flex flex-col">
        {testExecution.recordings.map((recording, index) => (
          <RecordingRow
            key={recording.id}
            recording={recording}
            status={
              testExecution.result === "flaky"
                ? index === 0
                  ? "passed"
                  : "flaky"
                : testExecution.result
            }
          />
        ))}
      </div>
    </div>
  );
}
