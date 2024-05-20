import { useWorkspaceRootCauseRuns } from "@/graphql/queries/useGetWorkspaceRootCauseRuns";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSideWorkspaceProps } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Page({
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useSyncDefaultWorkspace();
  const { isLoading, runs: rcaRuns } = useWorkspaceRootCauseRuns(workspaceId);

  console.log("RCA runs: ", rcaRuns);

  const renderedRuns = rcaRuns.map(run => (
    <li key={run.id}>
      {run.id}: {run.result}
    </li>
  ));

  return (
    <div>
      <h1>Root Cause Analysis Page Here: {workspaceId}</h1>
      <h3>Runs</h3>
      <ul>{renderedRuns}</ul>
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
