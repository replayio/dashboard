import { DropDownMenu } from "@/components/DropDownMenu";
import { Input } from "@/components/Input";
import { PageLoadingPlaceholder } from "@/components/PageLoadingPlaceholder";
import { useWorkspaceTests } from "@/graphql/queries/useWorkspaceTests";
import { TestSummaryRow } from "@/pages/team/[id]/tests/TestSummaryRow";
import { getRelativeDate } from "@/utils/date";
import { useCallback, useMemo, useState, useTransition } from "react";

export const SORT_BY_FILTERS = {
  alphabetically: "Sort alphabetically",
  "failure-rate": "Sort by failure rate",
  "flaky-rate": "Sort by flaky rate",
};
export const DEFAULT_SORT_BY_FILTER = "failure-rate";
export type SortBy = keyof typeof SORT_BY_FILTERS;

export const RANGE_FILTERS = {
  day: "Last day",
  hour: "Last hour",
  week: "Last 7 days",
};
export const DEFAULT_RANGE_FILTER = "week";
export type Range = keyof typeof RANGE_FILTERS;

export function TestSummaries({
  selectedTestSummaryId,
  selectTestSummary,
  workspaceId,
}: {
  selectedTestSummaryId: string | null;
  selectTestSummary: (id: string) => void;
  workspaceId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const [filterText, setFilterText] = useState<string>("");
  const setFilterTextTransition = useCallback((text: string) => {
    startTransition(() => {
      setFilterText(text);
    });
  }, []);

  const [range, setRange] = useState<Range>(DEFAULT_RANGE_FILTER);
  const setRangeTransition = useCallback((range: Range) => {
    startTransition(() => {
      setRange(range);
    });
  }, []);

  const [sortBy, setSortBy] = useState<SortBy>(DEFAULT_SORT_BY_FILTER);
  const setSortByTransition = useCallback((sortBy: SortBy) => {
    startTransition(() => {
      setSortBy(sortBy);
    });
  }, []);

  let startDate: Date;
  switch (range) {
    case "day":
      startDate = getRelativeDate({ daysAgo: 1 });
      break;
    case "week":
      startDate = getRelativeDate({ daysAgo: 7 });
      break;
    case "hour":
      startDate = getRelativeDate({ hoursAgo: 1 });
      break;
  }

  const { isLoading, testSummaries } = useWorkspaceTests(
    workspaceId,
    startDate
  );

  const filteredTestSummaries = useMemo(() => {
    let summaries = Array.from(testSummaries ?? []);

    summaries = summaries.filter((test) => {
      if (filterText) {
        if (!test.title.toLowerCase().includes(filterText.toLowerCase())) {
          return false;
        }
      }

      return true;
    });

    summaries.sort((a, b) => {
      switch (sortBy) {
        case "flaky-rate":
          return b.stats.flakyRate - a.stats.flakyRate;
        case "alphabetically":
          return a.title.localeCompare(b.title);
        case "failure-rate":
        default:
          return b.stats.failureRate - a.stats.failureRate;
      }
    });

    return summaries;
  }, [filterText, sortBy, testSummaries]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
          <div className="basis-2/4 shrink overflow-auto">
            <DropDownMenu
              disabled={isPending}
              onChange={setSortByTransition}
              options={SORT_BY_FILTERS}
              value={sortBy}
            />
          </div>
          <div className="basis-2/4 shrink overflow-auto">
            <DropDownMenu
              disabled={isPending}
              onChange={setRangeTransition}
              options={RANGE_FILTERS}
              value={range}
            />
          </div>
        </div>
        <Input
          defaultValue={filterText}
          onConfirm={(value) => setFilterTextTransition(value)}
          placeholder="Filter tests"
          type="text"
        />
      </div>
      <div className="overflow-y-auto -mx-1">
        {isLoading && <PageLoadingPlaceholder />}
        {filteredTestSummaries?.map((test) => (
          <TestSummaryRow
            currentTestSummaryId={selectedTestSummaryId}
            key={test.id}
            selectTestSummary={selectTestSummary}
            showFlakyRate={sortBy === "flaky-rate"}
            testSummary={test}
          />
        ))}
      </div>
    </>
  );
}
