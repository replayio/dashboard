import {
  HasTestsRunsForWorkspaceQuery,
  HasTestsRunsForWorkspaceQueryVariables,
} from "@/graphql/generated/graphql";
import { graphQLQuery } from "@/graphql/graphQLQuery";
import { getRelativeDate } from "@/utils/date";
import { gql } from "@apollo/client";
import { MockGraphQLData } from "tests/mocks/types";

export async function hasTestsRunsForWorkspace(
  accessToken: string,
  workspaceId: string,
  mockGraphQLData: MockGraphQLData | null
): Promise<boolean> {
  const { data, errors } = await graphQLQuery<
    HasTestsRunsForWorkspaceQuery,
    HasTestsRunsForWorkspaceQueryVariables
  >({
    accessToken,
    mockGraphQLData,
    query: gql`
      query HasTestsRunsForWorkspace($workspaceId: ID!, $startTime: String, $endTime: String) {
        node(id: $workspaceId) {
          ... on Workspace {
            id
            testRuns(filter: { startTime: $startTime, endTime: $endTime }) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      startTime: getRelativeDate({ daysAgo: 30 }).toISOString().split("T")[0],
      workspaceId,
    },
  });

  if (errors && errors.length > 0) {
    console.error(errors[0]);
    return false;
  }

  if (data?.node && "testRuns" in data.node && data.node.testRuns) {
    return data.node.testRuns?.edges.length > 0;
  }

  return false;
}
