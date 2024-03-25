import { HEADERS } from "@/constants";
import { getWorkspace } from "@/graphql/queries/getWorkspaceType";
import assert from "assert";
import { GetServerSidePropsContext } from "next";

export async function getServerSidePropsHelpers({
  params,
  req,
}: GetServerSidePropsContext<{ id: string }>) {
  assert(params?.id != null, '"id" parameter is required');

  const workspaceId = params.id;
  const accessToken = req?.headers?.[HEADERS.accessToken] as string;

  try {
    const { isTest } = await getWorkspace(accessToken, workspaceId);

    return {
      isTest,
      workspaceId: params.id,
    };
  } catch (error) {
    console.log(error);

    return {
      invalidWorkspace: true,
      isTest: false,
      workspaceId,
    };
  }
}
