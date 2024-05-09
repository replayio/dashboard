import { DropDownMenu } from "@/components/DropDownMenu";
import { Input } from "@/components/Input";
import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { DATE_RANGE_FILTERS } from "@/pageComponents/team/constants";
import { CenterAlignedPrompt } from "@/pageComponents/team/id/tests/CenterAlignedPrompt";
import { SelectionNotFoundWarning } from "@/pageComponents/team/id/tests/SelectionNotFoundWarning";
import { TestSummaryRow } from "@/pageComponents/team/id/tests/TestSummaryRow";
import { TestsViewContext } from "@/pageComponents/team/id/tests/TestsViewContext";
import { SORT_BY_FILTERS } from "@/pageComponents/team/id/tests/constants";
import { useContext } from "react";

export function TestSummaries() {
  const {
    dateRange,
    filterText,
    isLoadingTestSummaries,
    isPending,
    selectedTestSummary,
    selectTestSummary,
    showInitialSelectedTestSummaryNotFoundWarning,
    showTestSummariesFilterMatchWarning,
    sortBy,
    testSummaries,
    updateFilters,
  } = useContext(TestsViewContext);

  return (
    <>
      {isLoadingTestSummaries && <LoadingProgressBar />}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
          <div className="basis-2/4 shrink min-w-0">
            <DropDownMenu
              data-test-id="Tests-SortByFilter"
              disabled={isPending}
              onChange={sortBy => updateFilters({ sortBy })}
              options={SORT_BY_FILTERS}
              value={sortBy}
            />
          </div>
          <div className="basis-2/4 shrink min-w-0">
            <DropDownMenu
              data-test-id="Tests-DateRangeFilter"
              disabled={isPending}
              onChange={dateRange => updateFilters({ dateRange })}
              options={DATE_RANGE_FILTERS}
              value={dateRange}
            />
          </div>
        </div>
        <Input
          data-test-id="Tests-TextFilter"
          defaultValue={filterText}
          onConfirm={filterText => updateFilters({ filterText })}
          placeholder="Filter tests"
          type="text"
        />
      </div>
      {showTestSummariesFilterMatchWarning ? (
        <CenterAlignedPrompt>No results match the current filters.</CenterAlignedPrompt>
      ) : (
        <div className="overflow-y-auto -mx-2">
          {showInitialSelectedTestSummaryNotFoundWarning && (
            <SelectionNotFoundWarning name="test" />
          )}
          {testSummaries?.map(test => (
            <TestSummaryRow
              currentTestSummaryId={selectedTestSummary?.id}
              key={test.id}
              selectTestSummary={selectTestSummary}
              showFlakyRate={sortBy === "flaky-rate"}
              testSummary={test}
            />
          ))}
        </div>
      )}
    </>
  );
}
