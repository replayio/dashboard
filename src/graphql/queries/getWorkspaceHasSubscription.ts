import { graphQLQuery } from "@/graphql/graphQLQuery";
import { gql } from "@apollo/client";
import { MockGraphQLData } from "@/testing/mockGraphQLTypes";

// v2 pricing: SSR-safe null-tolerant subscription check used to decide whether
// to redirect a workspace to the plan picker. Unlike getWorkspaceSubscriptionStatus,
// this does NOT throw when the subscription row is absent (which is the expected
// state for a workspace freshly created via createWorkspaceV2).

type GetWorkspaceHasSubscriptionQuery = {
  node?: {
    __typename?: string;
    id?: string;
    subscription?: {
      id?: string;
      status?: string;
      plan?: {
        key?: string;
        tier?: string;
      } | null;
    } | null;
  } | null;
};

type GetWorkspaceHasSubscriptionVariables = {
  workspaceId: string;
};

export async function getWorkspaceHasSubscription(
  workspaceId: string,
  accessToken: string,
  mockGraphQLData: MockGraphQLData | null
): Promise<{
  hasSubscription: boolean;
  status: string | null;
  planKey: string | null;
  planTier: string | null;
}> {
  const { data, errors } = await graphQLQuery<
    GetWorkspaceHasSubscriptionQuery,
    GetWorkspaceHasSubscriptionVariables
  >({
    accessToken,
    mockGraphQLData,
    query: gql`
      query GetWorkspaceHasSubscription($workspaceId: ID!) {
        node(id: $workspaceId) {
          ... on Workspace {
            id
            subscription {
              id
              status
              plan {
                key
                tier
              }
            }
          }
        }
      }
    `,
    variables: { workspaceId },
  });

  if (errors && errors.length > 0) {
    throw new Error(errors[0]?.message);
  }

  const sub = data?.node && "subscription" in data.node ? data.node.subscription : null;

  return {
    hasSubscription: Boolean(sub?.id),
    status: sub?.status ?? null,
    planKey: sub?.plan?.key ?? null,
    planTier: sub?.plan?.tier ?? null,
  };
}
