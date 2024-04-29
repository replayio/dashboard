import { HEADERS } from "@/constants";
import { getCurrentUser } from "@/graphql/queries/getCurrentUser";
import { getWorkplaceMemberRoles } from "@/graphql/queries/getWorkplaceMemberRoles";
import { getWorkspaceSubscriptionStatus } from "@/graphql/queries/getWorkspaceSubscriptionStatus";
import { decompress } from "@/utils/compression";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import { redirectWithState } from "@/utils/redirectWithState";
import assert from "assert";
import { GetServerSidePropsContext } from "next";
import { MockGraphQLData } from "tests/mocks/types";

export default function Page() {
  return null;
}

export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>) {
  const { params, req } = context;

  assert(params?.id != null, '"id" parameter is required');

  const accessToken = getValueFromArrayOrString(req?.headers?.[HEADERS.accessToken]);
  assert(accessToken != null, "accessToken is required");

  const mockGraphQLDataString = getValueFromArrayOrString(req?.headers?.[HEADERS.mockGraphQLData]);
  const mockGraphQLData = mockGraphQLDataString
    ? decompress<MockGraphQLData>(mockGraphQLDataString)
    : null;

  const workspaceId = params.id;
  const status = await getWorkspaceSubscriptionStatus(workspaceId, accessToken, mockGraphQLData);

  // If the subscription is canceled, the default tab for workspace settings is billing
  // else the default tab for workspace settings is Team Members
  if (status === "canceled") {
    const user = await getCurrentUser(accessToken, mockGraphQLData);
    const members = await getWorkplaceMemberRoles(workspaceId, accessToken, mockGraphQLData);
    const member = members?.find(({ id }) => id === user?.id);
    const currentUserIsAdmin = member?.roles.includes("admin") == true;
    if (currentUserIsAdmin) {
      return redirectWithState({
        context,
        pathname: `/team/${workspaceId}/settings/billing`,
      });
    }
  }
  return redirectWithState({
    context,
    pathname: `/team/${workspaceId}/settings/members`,
  });
}
