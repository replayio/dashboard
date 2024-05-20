import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SessionContext } from "@/components/SessionContext";
import { useGetWorkspaceMembers } from "@/graphql/queries/getWorkspaceMembers";
import { useWorkspaces } from "@/graphql/queries/useWorkspaces";
import { WorkspaceSettings } from "@/pageComponents/team/id/settings/WorkspaceSettings";
import { TeamSettingsLayout } from "@/pageComponents/team/id/settings/layout/TeamSettingsLayout";
import assert from "assert";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useContext } from "react";

export default function Page({
  route,
  stripeKey,
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user } = useContext(SessionContext);
  const { members } = useGetWorkspaceMembers(workspaceId);

  const { workspaces } = useWorkspaces();
  const workspace = workspaces?.find(({ id }) => id === workspaceId);

  if (user == null || members == null || workspace == null) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full h-full p-2">
      <WorkspaceSettings route={route} stripeKey={stripeKey} workspace={workspace} />
    </div>
  );
}

Page.Layout = TeamSettingsLayout;

export async function getServerSideProps({
  params,
  query,
}: GetServerSidePropsContext<{ id: string }>) {
  assert(params?.id != null, '"id" parameter is required');

  const stripeKey = process.env.STRIPE_KEY;
  assert(stripeKey != null, "STRIPE_KEY is required");

  return {
    props: { route: query.route as string, stripeKey, workspaceId: params.id },
  };
}
