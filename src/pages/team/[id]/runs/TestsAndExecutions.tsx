import { PageLoadingPlaceholder } from "@/components/PageLoadingPlaceholder";
import { useTestSuiteTests } from "@/graphql/queries/useTestSuiteTests";
import { TestSuiteTestStatus } from "@/graphql/types";
import { TestExecutionRow } from "@/pages/team/[id]/runs/TestExecutionRow";
import { TestRunErrors } from "@/pages/team/[id]/runs/TestRunErrors";
import assert from "assert";

export function TestsAndExecutions({
  selectedTestId,
  selectedTestRunId,
  workspaceId,
}: {
  selectedTestId: string;
  selectedTestRunId: string;
  workspaceId: string;
}) {
  const { isLoading, tests } = useTestSuiteTests(
    workspaceId,
    selectedTestRunId
  );
  const selectedTest = tests?.find((test) => test.id === selectedTestId);

  if (selectedTest == null) {
    return <PageLoadingPlaceholder />;
  }

  return (
    <>
      <div className="shrink-0 -mx-1">
        <div className="font-bold mb-2">Replays</div>
        {selectedTest.recordings.map((recording, index) => {
          let status: TestSuiteTestStatus;
          switch (selectedTest.status) {
            case "failed": {
              status = "failed";
              break;
            }
            case "flaky": {
              status =
                index === selectedTest.recordings.length - 1
                  ? "passed"
                  : "flaky";
              break;
            }
            case "passed": {
              status = "passed";
              break;
            }
          }

          return (
            <TestExecutionRow
              key={recording.id}
              recording={recording}
              status={status}
            />
          );
        })}
      </div>
      <TestRunErrors test={selectedTest} />
    </>
  );
}
