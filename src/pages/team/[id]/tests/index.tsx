import { useWorkspaceTests } from "@/graphql/queries/useWorkspaceTests";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { useWorkspaceIdFromUrl } from "@/hooks/useWorkspaceIdFromUrl";
import { TestSummaries } from "@/pages/team/[id]/tests/TestSummaries";
import { TestSummary } from "@/pages/team/[id]/tests/TestSummary";
import { getRelativeDate } from "@/utils/date";
import { useCallback, useState, useTransition } from "react";

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

export default function TestSuiteTestsPage() {
  const workspaceId = useWorkspaceIdFromUrl();

  useSyncDefaultWorkspace(workspaceId);

  const [isPending, startTransition] = useTransition();

  const [selectedTestSummaryId, setSelectedTestSummaryId] = useState<
    string | null
  >(null);
  const selectTestSummary = useCallback((id: string) => {
    startTransition(() => {
      setSelectedTestSummaryId(id);
    });
  }, []);

  const { isLoading } = useWorkspaceTests(
    workspaceId,
    getRelativeDate({ daysAgo: 7 })
  );

  return (
    <div className="flex flex-row gap-2 overflow-auto overflow-hidden p-2 h-full">
      <div className="bg-slate-800 text-white p-2 rounded basis-2/4 overflow-auto flex flex-col gap-2">
        <TestSummaries
          selectedTestSummaryId={selectedTestSummaryId}
          selectTestSummary={selectTestSummary}
          workspaceId={workspaceId}
        />
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-2/4 overflow-auto flex flex-col gap-2">
        {selectedTestSummaryId ? (
          <TestSummary
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
