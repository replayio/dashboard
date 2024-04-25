import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { TestSuiteTestStatus } from "@/graphql/types";
import { ExpandableSection } from "@/pageComponents/team/id/runs/ExpandableSection";
import { TestExecutionRow } from "@/pageComponents/team/id/runs/TestExecutionRow";
import { TestRunErrors } from "@/pageComponents/team/id/runs/TestRunErrors";
import { RunsViewContext } from "@/pageComponents/team/id/runs/TestRunsContext";
import { exec } from "child_process";
import { useContext } from "react";

export function TestsAndExecutions({ selectedTestId }: { selectedTestId: string }) {
  const { tests } = useContext(RunsViewContext);

  const selectedTest = tests?.find(test => test.id === selectedTestId);

  if (selectedTest == null) {
    return <LoadingProgressBar />;
  }

  return (
    <>
      <div className="bg-slate-900 text-white p-2 rounded" data-test-id="TestExecution-Recordings">
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
      <TestRunErrors test={selectedTest} />
    </>
  );
}
