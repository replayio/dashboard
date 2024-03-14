import { RecordingRow } from "@/app/team/[id]/tests/RecordingRow";
import { Icon, IconType } from "@/components/Icon";
import { TestSuiteTestExecution } from "@/graphql/types";
import { formatRelativeTime } from "@/utils/number";
import { getColorClassName } from "@/utils/test-suites";

export function ExecutionRow({
  testExecution,
}: {
  testExecution: TestSuiteTestExecution;
}) {
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
    <>
      <div className="flex flex-row items-center gap-2">
        <Icon
          className={`w-6 h-6 ${getColorClassName(testExecution.result)}`}
          type={iconType}
        />
        <div className="flex flex-col grow truncate">
          <div>{testExecution.commitTitle}</div>

          {testExecution.commitAuthor && (
            <div className="flex flex-row items-center gap-1 text-sm">
              <Icon className="w-4 h-4" type="account" />
              {testExecution.commitAuthor}
            </div>
          )}
        </div>
        <div className="flex flex-row gap-1 items-center shrink-0 text-sm">
          <Icon className="w-3 h-3" type="clock" />
          {formatRelativeTime(testExecution.createdAt)} ago
        </div>
      </div>
      <div className="flex flex-col pl-4">
        {testExecution.recordings.map((recording) => (
          <RecordingRow
            key={recording.id}
            recording={recording}
            status={testExecution.result}
          />
        ))}
      </div>
    </>
  );
}
