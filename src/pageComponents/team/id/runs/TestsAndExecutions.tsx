import { Icon } from "@/components/Icon";
import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { CenterAlignedPrompt } from "@/pageComponents/team/id/runs/CenterAlignedPrompt";
import { ExpandableSection } from "@/pageComponents/team/id/runs/ExpandableSection";
import { TestExecutionRow } from "@/pageComponents/team/id/runs/TestExecutionRow";
import { TestRunErrors } from "@/pageComponents/team/id/runs/TestRunErrors";
import { RunsViewContext } from "@/pageComponents/team/id/runs/TestRunsContext";
import { isDateWithinRetentionLimits } from "@/utils/workspace";
import { ButtonHTMLAttributes, useContext } from "react";

function TestExecutionMessage({ children, ...rest }: ButtonHTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className="bg-slate-900 text-slate-300 p-2 rounded">
      <Icon className="w-4 h-4 inline" type="info" /> {children}
    </div>
  );
}

export function TestsAndExecutions() {
  const {
    isLoadingTestRuns,
    isLoadingTests,
    retentionLimit,
    selectedTestRunId,
    selectedTestId,
    showSelectTestPrompt,
    tests,
    testRuns,
  } = useContext(RunsViewContext);

  const selectedTest = tests?.find(test => test.id === selectedTestId);
  const selectedTestRun = testRuns?.find(run => run.id === selectedTestRunId);

  if (isLoadingTestRuns || isLoadingTests) {
    return <LoadingProgressBar />;
  } else if (showSelectTestPrompt) {
    return <CenterAlignedPrompt>Select a test to see its details here</CenterAlignedPrompt>;
  } else if (selectedTestRun == null || selectedTest == null) {
    return null;
  }

  const isWithinRetentionLimit = isDateWithinRetentionLimits(selectedTestRun.date, retentionLimit);

  const recordings = selectedTest.executions.flatMap(execution => {
    return execution.recordings.map(recording => (
      <TestExecutionRow key={recording.id} recording={recording} status={execution.status} />
    ));
  });

  return (
    <>
      {isWithinRetentionLimit ? (
        recordings.length > 0 ? (
          <div
            className="bg-slate-900 text-white p-2 rounded"
            data-test-id="TestExecution-Recordings"
          >
            <ExpandableSection label="Replays" openByDefault>
              <div className="shrink-0 -mx-2">{recordings}</div>
            </ExpandableSection>
          </div>
        ) : (
          <TestExecutionMessage data-test-name="TestExecution-NoRecordingsMessage">
            No Replay found. Either the test was not recorded or Replay browser may have crashed
            before recording.
          </TestExecutionMessage>
        )
      ) : (
        <TestExecutionMessage data-test-name="TestExecution-RetentionMessage">
          The replays recorded during this test run are no longer available because of workspace
          retention limits.
        </TestExecutionMessage>
      )}

      <TestRunErrors test={selectedTest} />
    </>
  );
}
