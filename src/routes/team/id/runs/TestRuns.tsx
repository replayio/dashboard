import { DropDownMenu } from "@/components/DropDownMenu";
import { DropDownTrigger } from "@/components/DropDownTrigger";
import { Input } from "@/components/Input";
import { PageLoadingPlaceholder } from "@/components/PageLoadingPlaceholder";
import { TestRunRow } from "@/routes/team/id/runs/TestRunRow";
import { TestRunStatsGraph } from "@/routes/team/id/runs/TestRunStatsGraph";
import { RunsViewContext } from "@/routes/team/id/runs/TestRunsContext";
import {
  BRANCH_FILTERS,
  RUN_STATUS_FILTERS,
} from "@/routes/team/id/runs/constants";
import { useContext } from "react";

export default function TestRuns({
  selectedTestRunId,
  selectTestRun,
}: {
  selectedTestRunId: string | undefined;
  selectTestRun: (id: string) => void;
}) {
  const {
    isLoadingTestRuns,
    isPending,
    runsBranch,
    runsFilterText,
    runsStatus,
    testRuns,
    updateFilters,
  } = useContext(RunsViewContext);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
          <div className="basis-4/12 shrink overflow-auto">
            <DropDownMenu
              disabled={isPending}
              onChange={(runsStatus) => updateFilters({ runsStatus })}
              options={RUN_STATUS_FILTERS}
              value={runsStatus}
            />
          </div>
          <div className="basis-4/12 shrink overflow-auto">
            <DropDownTrigger disabled label="Last 7 days" onClick={noop} />
          </div>
          <div className="basis-4/12 shrink overflow-auto">
            <DropDownMenu
              disabled={isPending}
              onChange={(runsBranch) => updateFilters({ runsBranch })}
              options={BRANCH_FILTERS}
              value={runsBranch}
            />
          </div>
        </div>
        <Input
          defaultValue={runsFilterText}
          name="testRunFilter"
          onConfirm={(runsFilterText) => updateFilters({ runsFilterText })}
          placeholder="Filter test runs"
          type="text"
        />
      </div>
      {isLoadingTestRuns && <PageLoadingPlaceholder />}
      {testRuns != null ? <TestRunStatsGraph testRuns={testRuns} /> : null}
      <div className="overflow-y-auto -mx-1">
        {testRuns?.map((testRun) => (
          <TestRunRow
            currentTestRunId={selectedTestRunId}
            key={testRun.id}
            selectTestRun={selectTestRun}
            testRun={testRun}
          />
        ))}
      </div>
    </>
  );
}

function noop() {}
