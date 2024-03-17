import { DropDownMenu } from "@/components/DropDownMenu";
import { DropDownTrigger } from "@/components/DropDownTrigger";
import { Input } from "@/components/Input";
import { PageLoadingPlaceholder } from "@/components/PageLoadingPlaceholder";
import { useTestSuiteTestRuns } from "@/graphql/queries/useTestSuiteTestRuns";
import { TestRunRow } from "@/pages/team/[id]/runs/TestRunRow";
import { TestRunStatsGraph } from "@/pages/team/[id]/runs/TestRunStatsGraph";
import { getRelativeDate } from "@/utils/date";
import { filterTestRun } from "@/utils/test-suites";
import { useCallback, useMemo, useState, useTransition } from "react";

export const BRANCH_FILTERS = {
  all: "All branches",
  primary: "Only primary branch",
};
export const DEFAULT_BRANCH_FILTER = "all";
export type Branch = keyof typeof BRANCH_FILTERS;

export const STATUS_FILTERS = {
  all: "All runs",
  failed: "Only failures",
};
export const DEFAULT_STATUS_FILTER = "all";
export type Status = keyof typeof STATUS_FILTERS;

export default function TestRuns({
  selectedTestRunId,
  selectTestRun,
  workspaceId,
}: {
  selectedTestRunId: string | null;
  selectTestRun: (id: string) => void;
  workspaceId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const [filterText, setFilterText] = useState<string>("");
  const setFilterTextTransition = useCallback((text: string) => {
    startTransition(() => {
      setFilterText(text);
    });
  }, []);

  const [branch, setBranch] = useState<Branch>(DEFAULT_BRANCH_FILTER);
  const setBranchTransition = useCallback((branch: Branch) => {
    startTransition(() => {
      setBranch(branch);
    });
  }, []);

  const [status, setStatus] = useState<Status>(DEFAULT_STATUS_FILTER);
  const setStatusTransition = useCallback((status: Status) => {
    startTransition(() => {
      setStatus(status);
    });
  }, []);

  const { isLoading, testRuns } = useTestSuiteTestRuns(workspaceId);
  const filteredTestRuns = useMemo(() => {
    return testRuns?.filter((testRun) =>
      filterTestRun(testRun, {
        afterDate: getRelativeDate({ daysAgo: 6 }),
        branch,
        status,
        text: filterText,
      })
    );
  }, [branch, filterText, status, testRuns]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
          <div className="basis-4/12 shrink overflow-auto">
            <DropDownMenu
              disabled={isPending}
              onChange={setStatusTransition}
              options={STATUS_FILTERS}
              value={status}
            />
          </div>
          <div className="basis-4/12 shrink overflow-auto">
            <DropDownTrigger disabled label="Last 7 days" onClick={noop} />
          </div>
          <div className="basis-4/12 shrink overflow-auto">
            <DropDownMenu
              disabled={isPending}
              onChange={setBranchTransition}
              options={BRANCH_FILTERS}
              value={branch}
            />
          </div>
        </div>
        <Input
          defaultValue={filterText}
          name="testRunFilter"
          onConfirm={(value) => setFilterTextTransition(value)}
          placeholder="Filter test runs"
          type="text"
        />
      </div>
      {isLoading && <PageLoadingPlaceholder />}
      {filteredTestRuns ? (
        <TestRunStatsGraph testRuns={filteredTestRuns} />
      ) : null}
      <div className="overflow-y-auto -mx-1">
        {filteredTestRuns?.map((testRun) => (
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
