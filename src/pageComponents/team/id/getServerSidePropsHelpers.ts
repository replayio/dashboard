import { COOKIES, HEADERS } from "@/constants";
import { getWorkspace } from "@/graphql/queries/getWorkspaceType";
import { decompress } from "@/utils/compression";
import { getCookieValueServer } from "@/utils/cookie";
import assert from "assert";
import { GetServerSidePropsContext } from "next";
import { MockGraphQLData } from "tests/mocks/types";

export async function getServerSideWorkspaceProps({
  params,
  req,
}: GetServerSidePropsContext<{ id: string }>) {
  assert(params?.id != null, '"id" parameter is required');

  const workspaceId = params.id;
  const accessToken = req?.headers?.[HEADERS.accessToken] as string;

  const mockGraphQLDataCompressed = getCookieValueServer(req.cookies, COOKIES.mockGraphQLData);
  const mockGraphQLData = mockGraphQLDataCompressed
    ? decompress<MockGraphQLData>(mockGraphQLDataCompressed)
    : null;

  try {
    const { isTest, retentionLimit } = await getWorkspace(
      accessToken,
      workspaceId,
      mockGraphQLData
    );

    return {
      isInvalid: false as const,
      isTest,
      retentionLimit,
      workspaceId,
    };
  } catch (error) {
    return {
      isInvalid: true as const,
      workspaceId,
    };
  }
}
