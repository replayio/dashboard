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

  const { isLoading, recordings: allRecordings } = useWorkspaceRecordings(workspaceId);

  return <RecordingPage isLoading={isLoading} recordings={allRecordings} />;
}

Page.Layout = TeamLayout;

export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>) {
  const { isInvalid, isTest, workspaceId } = await getServerSideWorkspaceProps(context);

  if (isInvalid) {
    return redirectWithState({
      context,
      pathname: `/team/${workspaceId}/not-found`,
    });
  } else if (isTest) {
    return redirectWithState({
      context,
      pathname: `/team/${workspaceId}/runs`,
    });
  }

  return {
    props: {
      workspaceId,
    },
  };
}
