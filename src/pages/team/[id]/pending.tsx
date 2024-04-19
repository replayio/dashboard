import { getServerSidePropsHelpers as getServerSidePropsShared } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import { PendingPage } from "@/pageComponents/team/id/pending/PendingPage";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Page({
  isTest,
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <PendingPage isTest={isTest} workspaceId={workspaceId} />;
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
      props: { isTest, workspaceId },
    });
  }

  return {
    props: {
      isTest,
      workspaceId,
    },
  };
}
