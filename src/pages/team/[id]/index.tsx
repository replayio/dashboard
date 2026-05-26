import { BILLING_V2_PICKER_ENABLED, HEADERS } from "@/constants";
import { getWorkspaceHasSubscription } from "@/graphql/queries/getWorkspaceHasSubscription";
import { getServerSideWorkspaceProps } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import { decompress } from "@/utils/compression";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext } from "next";
import { MockGraphQLData } from "@/testing/mockGraphQLTypes";

export default function Page() {
  return null;
}

export async function getServerSideProps(context: GetServerSidePropsContext<any>) {
  const { isInvalid, isTest, workspaceId } = await getServerSideWorkspaceProps(context);

  if (isInvalid) {
    return redirectWithState({
      context,
      pathname: `/team/${workspaceId}/not-found`,
    });
  }

  // v2 pricing: if the workspace has no subscription row at all (i.e. it was
  // created via createWorkspaceV2 and the user hasn't picked a plan yet),
  // route them to the plan picker before anything else. Legacy workspaces
  // always have a subscription, so this is a no-op for them.
  if (BILLING_V2_PICKER_ENABLED) {
    const accessToken = getValueFromArrayOrString(context.req?.headers?.[HEADERS.accessToken]);
    if (accessToken) {
      const mockGraphQLDataString = getValueFromArrayOrString(
        context.req?.headers?.[HEADERS.mockGraphQLData]
      );
      const mockGraphQLData = mockGraphQLDataString
        ? decompress<MockGraphQLData>(mockGraphQLDataString)
        : null;

      try {
        const { hasSubscription } = await getWorkspaceHasSubscription(
          workspaceId,
          accessToken,
          mockGraphQLData
        );

        if (!hasSubscription) {
          return redirectWithState({
            context,
            pathname: `/team/${workspaceId}/plans`,
          });
        }
      } catch {
        // If the lookup fails (network blip, permissions edge case), fall
        // through to the legacy behaviour rather than blocking the user.
      }
    }
  }

  return redirectWithState({
    context,
    pathname: isTest ? `/team/${workspaceId}/runs` : `/team/${workspaceId}/recordings`,
  });
}
