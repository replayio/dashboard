import {
  GetTestsRunsForWorkspaceQuery,
  GetTestsRunsForWorkspaceQueryVariables,
} from "@/graphql/generated/graphql";
import { TestRun } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import { useMemo } from "react";

export function useTestSuiteTestRuns(
  workspaceId: string,
  startDate: Date,
  endDate?: Date
) {
  const { data, error, isLoading } = useGraphQLQuery<
    GetTestsRunsForWorkspaceQuery,
    GetTestsRunsForWorkspaceQueryVariables
  >(
    gql`
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
    {
      endTime: endDate?.toISOString().split("T")[0],
      startTime: startDate.toISOString().split("T")[0],
      workspaceId,
    }
  );

  const testRuns = useMemo<TestRun[] | undefined>(() => {
    if (data?.node && "testRuns" in data.node) {
      return (
        data.node.testRuns?.edges.map(({ node }) => {
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
  }, [data]);

  return { error, isLoading, testRuns };
}
