import { useWorkspaceRecordings } from "@/graphql/queries/useWorkspaceRecordings";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSideWorkspaceProps } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import RecordingPage from "@/pageComponents/team/id/recordings/RecordingsPage";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Page({
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useSyncDefaultWorkspace();

  return <div>Root Cause Analysis Page Here</div>;
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
