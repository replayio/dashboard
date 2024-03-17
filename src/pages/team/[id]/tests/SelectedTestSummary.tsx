import { PageLoadingPlaceholder } from "@/components/PageLoadingPlaceholder";
import { useWorkspaceTestExecutions } from "@/graphql/queries/useWorkspaceTestExecutions";
import { ExecutionRow } from "@/pages/team/[id]/tests/ExecutionRow";

export function SelectedTestSummary({
  testSummaryId,
  workspaceId,
}: {
  testSummaryId: string;
  workspaceId: string;
}) {
  const { executions = [], isLoading } = useWorkspaceTestExecutions(
    workspaceId,
    testSummaryId
  );

  return isLoading ? (
    <PageLoadingPlaceholder />
  ) : (
    <div className="flex flex-col gap-2 overflow-auto">
      {executions.map((execution) => (
        <ExecutionRow key={execution.id} testExecution={execution} />
      ))}
    </div>
  );
}
