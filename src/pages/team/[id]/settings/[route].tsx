import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useGetWorkspaceMembers } from "@/graphql/queries/getWorkspaceMembers";
import { useCurrentUser } from "@/graphql/queries/useCurrentUser";
import { useNonPendingWorkspaces } from "@/graphql/queries/useNonPendingWorkspaces";
import { WorkspaceSettings } from "@/pageComponents/team/id/settings/WorkspaceSettings";
import { SettingsLayout } from "@/pageComponents/team/id/settings/layout/SettingsLayout";
import assert from "assert";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Page({
  route,
  stripeKey,
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user } = useCurrentUser();
  const { members } = useGetWorkspaceMembers(workspaceId);

  const { workspaces } = useNonPendingWorkspaces();
  const workspace = workspaces?.find(({ id }) => id === workspaceId);

  if (user == null || members == null || workspace == null) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full h-full p-2">
      <WorkspaceSettings
        route={route}
        stripeKey={stripeKey}
        workspace={workspace}
      />
    </div>
  );
}

Page.Layout = SettingsLayout;

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
