import { DropDownMenu } from "@/components/DropDownMenu";
import { Input } from "@/components/Input";
import { PageLoadingPlaceholder } from "@/components/PageLoadingPlaceholder";
import { SelectedTestSummary } from "@/pages/team/[id]/tests/SelectedTestSummary";
import { TestSummaryRow } from "@/pages/team/[id]/tests/TestSummaryRow";
import {
  DATE_RANGE_FILTERS,
  SORT_BY_FILTERS,
} from "@/pages/team/[id]/tests/constants";
import { TestsViewContext } from "@/pages/team/[id]/tests/TestsViewContext";
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
    <div className="flex flex-row gap-2 overflow-auto overflow-hidden p-2 h-full">
      <div className="bg-slate-800 text-white p-2 rounded basis-2/4 overflow-auto flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <div className="basis-2/4 shrink overflow-auto">
              <DropDownMenu
                disabled={isPending}
                onChange={(sortBy) => updateFilters({ sortBy })}
                options={SORT_BY_FILTERS}
                value={sortBy}
              />
            </div>
            <div className="basis-2/4 shrink overflow-auto">
              <DropDownMenu
                disabled={isPending}
                onChange={(dateRange) => updateFilters({ dateRange })}
                options={DATE_RANGE_FILTERS}
                value={dateRange}
              />
            </div>
          </div>
          <Input
            defaultValue={filterText}
            onConfirm={(filterText) => updateFilters({ filterText })}
            placeholder="Filter tests"
            type="text"
          />
        </div>
        <div className="overflow-y-auto -mx-1">
          {isLoading && <PageLoadingPlaceholder />}
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
      <div className="bg-slate-800 text-white p-2 rounded basis-2/4 overflow-auto flex flex-col gap-2">
        {selectedTestSummaryId ? (
          <SelectedTestSummary
            testSummaryId={selectedTestSummaryId}
            workspaceId={workspaceId}
          />
        ) : !isLoading ? (
          <div className="flex items-center justify-center text-slate-300 h-full">
            Select a test to see its details here
          </div>
        ) : null}
      </div>
    </div>
  );
}
