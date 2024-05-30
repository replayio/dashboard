import { useWorkspaceRootCauseRuns } from "@/graphql/queries/useGetWorkspaceRootCauseRuns";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSideWorkspaceProps } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { RCATestEntryDetails } from "@/pageComponents/team/id/rca/RCATestEntryDetails";
import { useContext, useState } from "react";
import { SessionContext } from "@/components/SessionContext";

import { RCACategoriesList } from "@/pageComponents/team/id/rca/RCACategoriesList";
import { RCAAnalyzedTestsList } from "@/pageComponents/team/id/rca/RCAAnalyzedTestsList";

export default function Page({
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useSyncDefaultWorkspace();
  const [selectedTestEntryId, setSelectedTestEntryId] = useState<string | null>(null);
  const { isLoading, runs: rcaTestEntries } = useWorkspaceRootCauseRuns(workspaceId);

  const { user } = useContext(SessionContext);

  const selectedTestEntry = rcaTestEntries.find(entry => entry.id === selectedTestEntryId);

  return (
    <div className="h-full w-full p-2">
      <div className="flex h-full w-full">
        <div className="flex flex-col basis-2/5 p-2 max-w-[40%] ">
          <div className="flex flex-col basis-1/2 max-h-[50%]">
            <RCACategoriesList workspaceId={workspaceId} />
          </div>
          <div className="flex flex-col basis-1/2 max-h-[50%]">
            <RCAAnalyzedTestsList
              workspaceId={workspaceId}
              setSelectedTestEntryId={setSelectedTestEntryId}
              selectedTestEntryId={selectedTestEntryId}
            />
          </div>
        </div>
        <div className="basis-3/5 p-2 max-w-[60%]">
          <h3 className="text-lg font-bold">Test Analysis Details</h3>
          {selectedTestEntry && (
            <RCATestEntryDetails
              workspaceId={workspaceId}
              runId={selectedTestEntry.runId}
              testEntryId={selectedTestEntry.id}
              user={user}
            />
          )}
        </div>
      </div>
    </div>
  );
}

Page.Layout = TeamLayout;

export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>) {
  const { isInvalid, isTest, workspaceId } = await getServerSideWorkspaceProps(context);

  if (isInvalid) {
    return redirectWithState({
      context,
      pathname: "/team/me/recordings",
    });
  } else if (isTest) {
    // return redirectWithState({
    //   context,
    //   pathname: `/team/${workspaceId}/runs`,
    // });
  }

  return {
    props: {
      workspaceId,
    },
  };
}
