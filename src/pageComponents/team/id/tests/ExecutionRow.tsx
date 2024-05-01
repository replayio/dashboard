import { Icon } from "@/components/Icon";
import { TestSuiteTestExecution } from "@/graphql/types";
import { RecordingRow } from "@/pageComponents/team/id/tests/RecordingRow";
import { TestsViewContext } from "@/pageComponents/team/id/tests/TestsViewContext";
import { formatRelativeTime } from "@/utils/number";
import { useContext } from "react";

export function ExecutionRow({ testExecution }: { testExecution: TestSuiteTestExecution }) {
  const { retentionLimit } = useContext(TestsViewContext);

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
        {testExecution.recordings.map(recording => (
          <RecordingRow
            key={recording.id}
            recording={recording}
            retentionLimit={retentionLimit}
            status={testExecution.status}
          />
        ))}
      </div>
    </div>
  );
}
