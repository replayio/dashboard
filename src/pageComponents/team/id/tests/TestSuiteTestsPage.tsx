import { DropDownMenu } from "@/components/DropDownMenu";
import { Input } from "@/components/Input";
import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { SelectedTestSummary } from "@/pageComponents/team/id/tests/SelectedTestSummary";
import { TestSummaryRow } from "@/pageComponents/team/id/tests/TestSummaryRow";
import { TestsViewContext } from "@/pageComponents/team/id/tests/TestsViewContext";
import {
  DATE_RANGE_FILTERS,
  SORT_BY_FILTERS,
} from "@/pageComponents/team/id/tests/constants";
import { useContext } from "react";

export function TestSuiteTestsPage({ workspaceId }: { workspaceId: string }) {
  const {
    dateRange,
    filterText,
    isLoading,
    isPending,
    selectedTestSummaryId,
    selectTestSummary,
    sortBy,
    testSummaries,
    updateFilters,
  } = useContext(TestsViewContext);

  return (
    <div className="flex flex-col md:flex-row gap-2 p-2 overflow-auto overflow-hidden h-full">
      <div className="bg-slate-800 text-white p-2 rounded basis-2/4 overflow-auto flex flex-col gap-2 relative">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <div className="basis-2/4 shrink min-w-0">
              <DropDownMenu
                data-test-id="Tests-SortByFilter"
                disabled={isPending}
                onChange={(sortBy) => updateFilters({ sortBy })}
                options={SORT_BY_FILTERS}
                value={sortBy}
              />
            </div>
            <div className="basis-2/4 shrink min-w-0">
              <DropDownMenu
                data-test-id="Tests-DateRangeFilter"
                disabled={isPending}
                onChange={(dateRange) => updateFilters({ dateRange })}
                options={DATE_RANGE_FILTERS}
                value={dateRange}
              />
            </div>
          </div>
          <Input
            data-test-id="Tests-TextFilter"
            defaultValue={filterText}
            onConfirm={(filterText) => updateFilters({ filterText })}
            placeholder="Filter tests"
            type="text"
          />
        </div>
        <div className="overflow-y-auto -mx-2">
          {isLoading && <LoadingProgressBar />}
          {testSummaries?.map((test) => (
            <TestSummaryRow
              currentTestSummaryId={selectedTestSummaryId}
              key={test.id}
              selectTestSummary={selectTestSummary}
              showFlakyRate={sortBy === "flaky-rate"}
              testSummary={test}
            />
          ))}
        </div>
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-2/4 overflow-auto flex flex-col gap-2 relative">
        {selectedTestSummaryId ? (
          <SelectedTestSummary
            testSummaryId={selectedTestSummaryId}
            workspaceId={workspaceId}
          />
        ) : testSummaries && testSummaries.length > 0 ? (
          <div className="flex items-center justify-center text-slate-300 h-full">
            Select a test to see its details here
          </div>
        ) : null}
      </div>
    </div>
  );
}
