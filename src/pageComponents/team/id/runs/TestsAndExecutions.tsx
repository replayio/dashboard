import { Icon } from "@/components/Icon";
import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { ExpandableSection } from "@/pageComponents/team/id/runs/ExpandableSection";
import { TestExecutionRow } from "@/pageComponents/team/id/runs/TestExecutionRow";
import { TestRunErrors } from "@/pageComponents/team/id/runs/TestRunErrors";
import { RunsViewContext } from "@/pageComponents/team/id/runs/TestRunsContext";
import { isDateWithinRetentionLimits } from "@/utils/workspace";
import { useContext } from "react";

export function TestsAndExecutions({ selectedTestId }: { selectedTestId: string }) {
  const { retentionLimit, selectedTestRunId, tests, testRuns } = useContext(RunsViewContext);

  const selectedTest = tests?.find(test => test.id === selectedTestId);
  const selectedTestRun = testRuns?.find(run => run.id === selectedTestRunId);

  if (selectedTest == null || selectedTestRun == null) {
    return <LoadingProgressBar />;
  }

  const isWithinRetentionLimit = isDateWithinRetentionLimits(selectedTestRun.date, retentionLimit);

  return (
    <>
      {isWithinRetentionLimit ? (
        <div
          className="bg-slate-900 text-white p-2 rounded"
          data-test-id="TestExecution-Recordings"
        >
          <ExpandableSection label="Replays" openByDefault>
            <div className="shrink-0 -mx-2">
              {selectedTest.executions.flatMap((execution, index) => {
                return execution.recordings.map(recording => (
                  <TestExecutionRow
                    key={recording.id}
                    recording={recording}
                    status={execution.status}
                  />
                ));
              })}
            </div>
          </ExpandableSection>
        </div>
      ) : (
        <div
          className="bg-slate-900 text-slate-300 p-2 rounded"
          data-test-name="TestExecution-RetentionMessage"
        >
          <Icon className="w-4 h-4 inline" type="info" /> The replays recorded during this test run
          are no longer available because of workspace retention limits.
        </div>
      )}

      <TestRunErrors test={selectedTest} />
    </>
  );
}
