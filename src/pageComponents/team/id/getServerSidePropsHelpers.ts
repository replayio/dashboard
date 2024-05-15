import { HEADERS } from "@/constants";
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
    const { isTest, retentionLimit } = await getWorkspace(accessToken, workspaceId);

    return {
      isInvalid: false as const,
      isTest,
      retentionLimit,
      workspaceId: params.id,
    };
  } catch (error) {
    return {
      isInvalid: true as const,
      workspaceId,
    };
  }
}
