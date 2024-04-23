import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { useWorkspaceTestExecutions } from "@/graphql/queries/useWorkspaceTestExecutions";
import { ExecutionRow } from "@/pageComponents/team/id/tests/ExecutionRow";

export function SelectedTestSummary({
  testSummaryId,
  workspaceId,
}: {
  testSummaryId: string;
  workspaceId: string;
}) {
  const { executions = [], isLoading } = useWorkspaceTestExecutions(workspaceId, testSummaryId);

  return isLoading ? (
    <LoadingProgressBar />
  ) : (
    <div className="flex flex-col gap-2 overflow-auto -mx-2">
      {executions.map(execution => (
        <ExecutionRow key={execution.id} testExecution={execution} />
      ))}
    </div>
  );
}
