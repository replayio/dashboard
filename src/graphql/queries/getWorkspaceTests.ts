import {
  GetWorkspaceTestsQuery,
  GetWorkspaceTestsQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientServer } from "@/graphql/graphQLClient";
import { TestSuiteTestSummary } from "@/graphql/types";
import { gql } from "@apollo/client";
import assert from "assert";

export async function getWorkspaceTests(
  workspaceId: string,
  startTime: string,
  endTime: string
): Promise<TestSuiteTestSummary[]> {
  const graphQLClient = await getGraphQLClientServer();
  const response = await graphQLClient.query<
    GetWorkspaceTestsQuery,
    GetWorkspaceTestsQueryVariables
  >({
    query: gql`
      query GetWorkspaceTests(
        $workspaceId: ID!
        $startTime: String
        $endTime: String
      ) {
        node(id: $workspaceId) {
          ... on Workspace {
            id
            tests(filter: { startTime: $startTime, endTime: $endTime }) {
              edges {
                node {
                  testId
                  title
                  scope
                  stats {
                    passed
                    failed
                    flaky
                    skipped
                    unknown
                    failureRate
                    flakyRate
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      endTime: endTime || undefined,
      startTime: startTime || undefined,
      workspaceId,
    },
  });

  assert(
    response.data?.node &&
      "tests" in response.data.node &&
      response.data.node.tests?.edges
  );

  return response.data.node.tests.edges.map(({ node }) => ({
    id: node.testId,
    scope: node.scope,
    stats: {
      failed: node.stats.failed,
      failureRate: node.stats.failureRate,
      flaky: node.stats.flaky,
      flakyRate: node.stats.flakyRate,
      passed: node.stats.passed,
      skipped: node.stats.skipped,
      unknown: node.stats.unknown,
    },
    title: node.title,
  }));
}
