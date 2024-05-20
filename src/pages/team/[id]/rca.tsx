import { useWorkspaceRootCauseRuns } from "@/graphql/queries/useGetWorkspaceRootCauseRuns";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSideWorkspaceProps } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { RCATestEntryRow } from "@/pageComponents/team/id/rca/RCATestEntryRow";
import { RCATestEntryDetails } from "@/pageComponents/team/id/rca/RCATestEntryDetails";
import { useContext, useState } from "react";
import { SessionContext } from "@/components/SessionContext";

export default function Page({
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useSyncDefaultWorkspace();
  const { isLoading, runs: rcaTestEntries } = useWorkspaceRootCauseRuns(workspaceId);
  const [selectedTestEntryId, setSelectedTestEntryId] = useState<string | null>(null);

  const { user } = useContext(SessionContext);

  console.log("RCA test results: ", rcaTestEntries);

  const renderedEntries = rcaTestEntries.map(entry => (
    <RCATestEntryRow
      key={entry.id}
      analysisTestEntry={entry}
      user={user}
      onClick={() => setSelectedTestEntryId(entry.id)}
      selected={selectedTestEntryId === entry.id}
    />
  ));

  const selectedTestEntry = rcaTestEntries.find(entry => entry.id === selectedTestEntryId);

  return (
    <div className="w-full p-2">
      <div className="flex flex-column w-full">
        <div className="grow basis-3/5 p-2">
          <h3 className="text-lg font-bold">Recent Analyzed Failed Tests</h3>
          {renderedEntries}
        </div>
        <div className="basis-2/5 p-2">
          <h3 className="text-lg font-bold">Test Analysis Details</h3>
          {selectedTestEntry && (
            <RCATestEntryDetails analysisTestEntry={selectedTestEntry} user={user} />
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
