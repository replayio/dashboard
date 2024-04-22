import { useWorkspaceRecordings } from "@/graphql/queries/useWorkspaceRecordings";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSidePropsHelpers as getServerSidePropsShared } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import RecordingPage from "@/pageComponents/team/id/recordings/RecordingsPage";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Page({
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useSyncDefaultWorkspace();

  const { isLoading, recordings: allRecordings } =
    useWorkspaceRecordings(workspaceId);

  return <RecordingPage isLoading={isLoading} recordings={allRecordings} />;
}

Page.Layout = TeamLayout;

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const { invalidWorkspace, isTest, workspaceId } =
    await getServerSidePropsShared(context);

  if (invalidWorkspace) {
    return redirectWithState({
      context,
      pathname: "/team/me/recordings",
      props: { workspaceId },
    });
  } else if (isTest) {
    return redirectWithState({
      context,
      pathname: `/team/${workspaceId}/runs`,
      props: { workspaceId },
    });
  }

  return {
    props: {
      workspaceId,
    },
  };
}
