import { HEADERS } from "@/constants";
import { getPendingWorkspaces } from "@/graphql/queries/getPendingWorkspaces";
import { getServerSideWorkspaceProps } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import { PendingPage } from "@/pageComponents/team/id/pending/PendingPage";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Page({
  isTest,
  workspace,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <PendingPage isTest={isTest} workspace={workspace} />;
}

Page.Layout = TeamLayout;

export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>) {
  const accessToken = context.req?.headers?.[HEADERS.accessToken] as string;
  const [{ isInvalid, isTest, workspaceId }, pendingWorkspaces] = await Promise.all([
    getServerSideWorkspaceProps(context),
    getPendingWorkspaces(accessToken),
  ]);

  if (isInvalid) {
    return redirectWithState({
      context,
      pathname: "/team/me/recordings",
    });
  }

  const pendingWorkspace = pendingWorkspaces.find(({ id }) => id === workspaceId);

  if (!pendingWorkspace) {
    // if the user has access to this workspace but it can't be found among the pending workspaces
    // then most likely they already are a proper member of that workspace
    return redirectWithState({
      context,
      pathname: isTest ? `/team/${workspaceId}/runs` : `/team/${workspaceId}/recordings`,
    });
  }

  return {
    props: {
      isTest,
      workspace: pendingWorkspace,
    },
  };
}
