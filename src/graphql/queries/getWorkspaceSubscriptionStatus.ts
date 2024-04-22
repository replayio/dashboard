import {
  GetWorkspaceSubscriptionStatusQuery,
  GetWorkspaceSubscriptionStatusQueryVariables,
} from "@/graphql/generated/graphql";
import { graphQLFetch } from "@/graphql/graphQLFetch";
import { WorkspaceSubscriptionStatus } from "@/graphql/types";
import { gql } from "@apollo/client";
import { MockGraphQLData } from "tests/mocks/types";

export async function getWorkspaceSubscriptionStatus(
  workspaceId: string,
  accessToken: string,
  mockGraphQLData: MockGraphQLData | null
): Promise<WorkspaceSubscriptionStatus> {
  const { data, errors } = await graphQLFetch<
    GetWorkspaceSubscriptionStatusQuery,
    GetWorkspaceSubscriptionStatusQueryVariables
  >({
    accessToken,
    mockGraphQLData,
    query: gql`
      query GetWorkspaceSubscriptionStatus($workspaceId: ID!) {
        node(id: $workspaceId) {
          ... on Workspace {
            id
            subscription {
              id
              status
            }
          }
        }
      }
    `,
    variables: { workspaceId },
  });

  if (errors && errors.length > 0) {
    throw new Error(errors[0]?.message);
  } else if (
    !data?.node ||
    !("subscription" in data?.node) ||
    !data?.node?.subscription?.status
  ) {
    throw new Error("Subscription not found");
  }

  return data.node.subscription.status as WorkspaceSubscriptionStatus;
}
