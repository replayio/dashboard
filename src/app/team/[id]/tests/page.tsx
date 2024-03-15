"use server";

import { ExecutionRow } from "@/app/team/[id]/tests/ExecutionRow";
import { FilterInput } from "@/app/team/[id]/tests/FilterInput";
import { RangeMenu } from "@/app/team/[id]/tests/RangeMenu";
import { SortByMenu } from "@/app/team/[id]/tests/SortByMenu";
import { TestSummaryRow } from "@/app/team/[id]/tests/TestSummaryRow";
import { getWorkspaceTestExecutions } from "@/graphql/queries/getWorkspaceTestExecutions";
import { getWorkspaceTests } from "@/graphql/queries/getWorkspaceTests";
import { getRelativeDate } from "@/utils/date";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    filter?: string;
    range?: string;
    sortBy?: string;
    testSummaryId?: string;
  };
}) {
  const workspaceId = decodeURIComponent(params.id);

  const filter = searchParams.filter?.toLowerCase() ?? "";
  const range = searchParams.range ?? "";
  const sortBy = searchParams.sortBy ?? "";
  const testSummaryId = searchParams.testSummaryId ?? null;

  let startTime = "";
  switch (range) {
    case "day":
      startTime = getRelativeDate({ daysAgo: 1 }).toISOString();
      break;
    case "week":
      startTime = getRelativeDate({ daysAgo: 7 }).toISOString();
      break;
    case "hour":
      startTime = getRelativeDate({ hoursAgo: 1 }).toISOString();
      break;
  }

  let testSummaries = await getWorkspaceTests(workspaceId, startTime, "");
  if (filter !== "") {
    testSummaries = testSummaries.filter((test) =>
      test.title.toLowerCase().includes(filter)
    );
  }
  testSummaries.sort((a, b) => {
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

  const selectedTestSummary = testSummaries.find(
    (test) => test.id === testSummaryId
  );

  const executions = testSummaryId
    ? await getWorkspaceTestExecutions(workspaceId, testSummaryId)
    : [];
  executions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <div className="flex flex-row gap-2 overflow-auto overflow-hidden p-2 h-full">
      <div className="bg-slate-800 text-white p-2 rounded basis-2/4 overflow-auto flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <div className="basis-2/4 shrink overflow-auto">
              <SortByMenu />
            </div>
            <div className="basis-2/4 shrink overflow-auto">
              <RangeMenu />
            </div>
          </div>
          <FilterInput />
        </div>
        <div className="overflow-y-auto -mx-1">
          {testSummaries.map((test) => (
            <TestSummaryRow
              currentTestSummaryId={testSummaryId}
              key={test.id}
              showFlakyRate={sortBy === "flaky-rate"}
              testSummary={test}
            />
          ))}
        </div>
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-2/4 overflow-auto flex flex-col gap-2">
        {selectedTestSummary ? (
          <div className="overflow-auto">
            {executions.map((execution) => (
              <ExecutionRow key={execution.id} testExecution={execution} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center text-slate-300 h-full">
            Select a test to see its details here
          </div>
        )}
      </div>
    </div>
  );
}
