import { HEADERS } from "@/constants";
import { getPendingWorkspaces } from "@/graphql/queries/getPendingWorkspaces";
import { getWorkspace } from "@/graphql/queries/getWorkspaceType";
import assert from "assert";
import { GetServerSidePropsContext } from "next";

export async function getServerSideWorkspaceProps({
  params,
  req,
}: GetServerSidePropsContext<{ id: string }>) {
  assert(params?.id != null, '"id" parameter is required');

  const workspaceId = params.id;
  const accessToken = req?.headers?.[HEADERS.accessToken] as string;

  try {
    const [{ isTest }, pendingWorkspaces] = await Promise.all([
      getWorkspace(accessToken, workspaceId),
      // usually it won't be a critical error so let's pretend there are no pending workspaces in case of an error
      getPendingWorkspaces(accessToken).catch(() => []),
    ]);

    return {
      isInvalid: false as const,
      isTest,
      pendingWorkspace: pendingWorkspaces.find(({ id }) => id === workspaceId),
      workspaceId: params.id,
    };
  } catch (error) {
    return {
      isInvalid: true as const,
      workspaceId,
    };
  }
}
