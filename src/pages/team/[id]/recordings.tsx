import { HEADERS } from "@/constants";
import { getWorkspace } from "@/graphql/queries/getWorkspaceType";
import { useWorkspaceRecordings } from "@/graphql/queries/useWorkspaceRecordings";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSideProps as getServerSidePropsShared } from "@/routes/team/id/getServerSideProps";
import RecordingPage from "@/routes/team/id/recordings/RecordingsPage";
import { GetServerSidePropsContext } from "next";

export default function Page({ workspaceId }: { workspaceId: string }) {
  useSyncDefaultWorkspace();

  const { isLoading, recordings: allRecordings } =
    useWorkspaceRecordings(workspaceId);

  return <RecordingPage isLoading={isLoading} recordings={allRecordings} />;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<any>
) {
  const { props } = await getServerSidePropsShared(context);
  const { workspaceId } = props;

  const accessToken = context.req?.headers?.[HEADERS.accessToken] as string;
  const { isTest } = await getWorkspace(accessToken, workspaceId);
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
