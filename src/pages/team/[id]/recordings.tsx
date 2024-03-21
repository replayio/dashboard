import { useWorkspaceRecordings } from "@/graphql/queries/useWorkspaceRecordings";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSidePropsHelpers as getServerSidePropsShared } from "@/routes/team/id/getServerSidePropsHelpers";
import RecordingPage from "@/routes/team/id/recordings/RecordingsPage";
import { GetServerSidePropsContext } from "next";

export default function Page({ workspaceId }: { workspaceId: string }) {
  useSyncDefaultWorkspace();

  const { isLoading, recordings: allRecordings } =
    useWorkspaceRecordings(workspaceId);

  return <RecordingPage isLoading={isLoading} recordings={allRecordings} />;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const { isTest, workspaceId } = await getServerSidePropsShared(context);
  if (isTest) {
    return {
      redirect: {
        permanent: false,
        destination: `/team/${workspaceId}/runs`,
      },
      props: {},
    };
  }

  return {
    props: {
      workspaceId,
    },
  };
}
