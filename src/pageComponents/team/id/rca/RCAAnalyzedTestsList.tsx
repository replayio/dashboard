import { useContext, useState } from "react";
import { useWorkspaceRootCauseCategories } from "@/graphql/queries/useWorkspaceRootCauseCategories";
import { useCreateRootCauseCategory } from "@/graphql/queries/useRootCauseCategoryMutations";

import { RCATestEntryRow } from "@/pageComponents/team/id/rca/RCATestEntryRow";
import { useWorkspaceRootCauseRuns } from "@/graphql/queries/useGetWorkspaceRootCauseRuns";
import { SessionContext } from "@/components/SessionContext";

export const RCAAnalyzedTestsList = ({
  workspaceId,
  setSelectedTestEntryId,
  selectedTestEntryId,
}: {
  workspaceId: string;
  setSelectedTestEntryId: (id: string) => void;
  selectedTestEntryId: string | null;
}) => {
  const { isLoading, runs: rcaTestEntries } = useWorkspaceRootCauseRuns(workspaceId);
  const { user } = useContext(SessionContext);

  const renderedEntries = rcaTestEntries.map(entry => (
    <RCATestEntryRow
      key={entry.id}
      analysisTestEntry={entry}
      user={user}
      onClick={() => setSelectedTestEntryId(entry.id)}
      selected={selectedTestEntryId === entry.id}
    />
  ));

  return (
    <>
      <h3 className="mt-8 text-xl font-medium">Recent Analyzed Failed Tests</h3>

      <div className="mt-2 overflow-y-auto grow">{renderedEntries}</div>
    </>
  );
};
