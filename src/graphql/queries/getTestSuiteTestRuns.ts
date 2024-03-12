import {
  GetTestsRunsForWorkspaceQuery,
  GetTestsRunsForWorkspaceQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientServer } from "@/graphql/graphQLClient";
import { TestRun } from "@/graphql/types";
import { gql } from "@apollo/client";
import assert from "assert";

export async function getTestSuiteTestRuns(
  workspaceId: string,
  startTime?: string | null,
  endTime?: string | null
): Promise<TestRun[]> {
  const graphQLClient = await getGraphQLClientServer();
  const response = await graphQLClient.query<
    GetTestsRunsForWorkspaceQuery,
    GetTestsRunsForWorkspaceQueryVariables
  >({
    query: gql`
      query GetTestsRunsForWorkspace(
        $workspaceId: ID!
        $startTime: String
        $endTime: String
      ) {
        node(id: $workspaceId) {
          ... on Workspace {
            id
            testRuns(filter: { startTime: $startTime, endTime: $endTime }) {
              edges {
                node {
                  id
                  date
                  mode
                  results {
                    counts {
                      failed
                      flaky
                      passed
                    }
                  }
                  source {
                    commitId
                    commitTitle
                    groupLabel
                    isPrimaryBranch
                    branchName
                    prNumber
                    prTitle
                    repository
                    triggerUrl
                    user
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { endTime, startTime, workspaceId },
  });

  assert(
    response.data.node && "testRuns" in response.data.node,
    "Test runs could not be loaded"
  );

  return (
    response.data.node.testRuns?.edges.map(({ node }) => {
      return {
        branchName: node.source.branchName ?? null,
        commitId: node.source.commitId ?? null,
        commitTitle: node.source.commitTitle ?? null,
        date: new Date(node.date),
        groupLabel: node.source.groupLabel ?? null,
        id: node.id,
        isPrimaryBranch: node.source.isPrimaryBranch === true,
        numFailed: node.results.counts.failed,
        numFlaky: node.results.counts.flaky,
        numPassed: node.results.counts.passed,
        prNumber: node.source.prNumber ?? null,
        prTitle: node.source.prTitle ?? null,
        repository: node.source.repository ?? null,
        triggerUrl: node.source.triggerUrl ?? null,
        user: node.source.user ?? null,
      };
    }) ?? []
  );
}
