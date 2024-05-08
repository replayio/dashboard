import { DropDownMenu } from "@/components/DropDownMenu";
import { Input } from "@/components/Input";
import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { DATE_RANGE_FILTERS } from "@/pageComponents/team/constants";
import { CenterAlignedPrompt } from "@/pageComponents/team/id/runs/CenterAlignedPrompt";
import { TestRunRow } from "@/pageComponents/team/id/runs/TestRunRow";
import { TestRunStatsGraph } from "@/pageComponents/team/id/runs/TestRunStatsGraph";
import { RunsViewContext } from "@/pageComponents/team/id/runs/TestRunsContext";
import { BRANCH_FILTERS, RUN_STATUS_FILTERS } from "@/pageComponents/team/id/runs/constants";
import { useContext } from "react";

export default function TestRuns() {
  const {
    isLoadingTestRuns,
    isPending,
    runsBranch,
    runsDateRange,
    runsFilterText,
    runsStatus,
    selectedTestRunId,
    selectTestRun,
    showTestRunsFilterMatchWarning,
    testRuns,
    updateFilters,
  } = useContext(RunsViewContext);

  return (
    <>
      {isLoadingTestRuns && <LoadingProgressBar />}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
          <div className="basis-4/12 shrink min-w-0">
            <DropDownMenu
              data-test-id="TestRuns-RunStatusFilter"
              disabled={isPending}
              onChange={runsStatus => updateFilters({ runsStatus })}
              options={RUN_STATUS_FILTERS}
              value={runsStatus}
            />
          </div>
          <div className="basis-4/12 shrink min-w-0">
            <DropDownMenu
              data-test-id="TestRuns-DateRangeFilter"
              disabled={isPending}
              onChange={runsDateRange => updateFilters({ runsDateRange })}
              options={DATE_RANGE_FILTERS}
              value={runsDateRange}
            />
          </div>
          <div className="basis-4/12 shrink min-w-0">
            <DropDownMenu
              data-test-id="TestRuns-BranchFilter"
              disabled={isPending}
              onChange={runsBranch => updateFilters({ runsBranch })}
              options={BRANCH_FILTERS}
              value={runsBranch}
            />
          </div>
        </div>
        <Input
          data-test-id="TestRuns-TextFilter"
          defaultValue={runsFilterText}
          name="testRunFilter"
          onConfirm={runsFilterText => updateFilters({ runsFilterText })}
          placeholder="Filter test runs"
          type="text"
        />
      </div>
      {showTestRunsFilterMatchWarning ? (
        <CenterAlignedPrompt>No test runs match the current filters.</CenterAlignedPrompt>
      ) : testRuns ? (
        <>
          <TestRunStatsGraph testRuns={testRuns} />
          <div className="overflow-y-auto -mx-2">
            {testRuns.map(testRun => (
              <TestRunRow
                currentTestRunId={selectedTestRunId}
                key={testRun.id}
                selectTestRun={selectTestRun}
                testRun={testRun}
              />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
