import { getServerSidePropsHelpers as getServerSidePropsShared } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import { WorkspaceSettings } from "@/pageComponents/team/id/settings/WorkspaceSettings";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Page({
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <WorkspaceSettings id={workspaceId} />;
}

Page.Layout = TeamLayout;

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const { workspaceId } = await getServerSidePropsShared(context);

  return {
    props: {
      workspaceId,
    },
  };
}
