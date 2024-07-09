import { getServerSideWorkspaceProps } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import NotFoundPage from "@/pageComponents/team/id/not-found/NotFoundPage";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext } from "next";

export default function Page({ workspaceId }: { workspaceId: string }) {
  return <NotFoundPage workspaceId={workspaceId} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext<any>) {
  const { isInvalid, workspaceId } = await getServerSideWorkspaceProps(context);

  if (!isInvalid) {
    // The user has access (now) so redirect them
    return redirectWithState({
      context,
      pathname: `/team/${workspaceId}`,
    });
  }

  return {
    props: {
      workspaceId,
    },
  };
}
