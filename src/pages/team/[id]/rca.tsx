import { useWorkspaceRootCauseRuns } from "@/graphql/queries/useGetWorkspaceRootCauseRuns";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSideWorkspaceProps } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { RCATestEntryRow } from "@/pageComponents/team/id/rca/RCATestEntryRow";
import { useContext } from "react";
import { SessionContext } from "@/components/SessionContext";

export default function Page({
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useSyncDefaultWorkspace();
  const { isLoading, runs: rcaTestEntries } = useWorkspaceRootCauseRuns(workspaceId);

  const { user } = useContext(SessionContext);

  console.log("RCA test results: ", rcaTestEntries);

  const renderedEntries = rcaTestEntries.map(entry => (
    <RCATestEntryRow key={entry.id} analysisTestEntry={entry} user={user} />
  ));

  return (
    <div>
      <h1 className="text-xl font-bold">Root Cause Analysis</h1>
      <h3 className="text-lg font-bold">Recent Analyzed Failed Tests</h3>
      {renderedEntries}
    </div>
  );
}

Page.Layout = TeamLayout;

export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>) {
  const { isInvalid, isTest, pendingWorkspace, workspaceId } =
    await getServerSideWorkspaceProps(context);

  if (isInvalid) {
    return redirectWithState({
      context,
      pathname: "/team/me/recordings",
    });
  } else if (pendingWorkspace) {
    return redirectWithState({
      context,
      pathname: `/team/${workspaceId}/pending`,
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
