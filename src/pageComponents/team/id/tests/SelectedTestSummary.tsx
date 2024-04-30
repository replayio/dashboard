import { Icon } from "@/components/Icon";
import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { useWorkspaceTestExecutions } from "@/graphql/queries/useWorkspaceTestExecutions";
import { getDateForDateRange } from "@/pageComponents/team/constants";
import { ExecutionRow } from "@/pageComponents/team/id/tests/ExecutionRow";
import { TestsViewContext } from "@/pageComponents/team/id/tests/TestsViewContext";
import { useContext } from "react";

export function SelectedTestSummary({
  testSummaryId,
  workspaceId,
}: {
  testSummaryId: string;
  workspaceId: string;
}) {
  const { dateRange } = useContext(TestsViewContext);

  let showOverflowMessage = false;
  switch (dateRange) {
    case "biweekly":
    case "month": {
      showOverflowMessage = true;
      break;
    }
  }

  const startDate = getDateForDateRange(dateRange);

  // Don't even try fetching more than one week of executions; it's too slow
  // Just let the GraphQL API return whatever its default is and we'll filter in memory
  const { executions = [], isLoading } = useWorkspaceTestExecutions(workspaceId, testSummaryId);

  const filteredExecutions = executions.filter(execution => {
    const createdAt = new Date(execution.createdAt);
    return createdAt.getTime() >= startDate.getTime();
  });
  console.log(executions.map(execution => execution.createdAt));
  console.log("filter by", startDate);
  console.log(filteredExecutions);

  return isLoading ? (
    <LoadingProgressBar />
  ) : (
    <div className="flex flex-col gap-2 overflow-auto -mx-2">
      {filteredExecutions.map(execution => (
        <ExecutionRow key={execution.id} testExecution={execution} />
      ))}
      {showOverflowMessage && (
        <div
          className="bg-slate-900 text-slate-300 mx-2 p-2 rounded"
          data-test-name="TestExecution-RetentionMessage"
        >
          <Icon className="w-4 h-4 inline" type="info" /> Test data older than one week may not be
          shown.
        </div>
      )}
    </div>
  );
}
