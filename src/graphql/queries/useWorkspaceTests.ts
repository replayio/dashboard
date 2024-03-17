import {
  GetWorkspaceTestsQuery,
  GetWorkspaceTestsQueryVariables,
} from "@/graphql/generated/graphql";
import { TestSuiteTestSummary } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import assert from "assert";
import { useMemo } from "react";

export function useWorkspaceTests(
  workspaceId: string,
  startDate: Date,
  endDate?: Date
) {
  const { data, error, isLoading } = useGraphQLQuery<
    GetWorkspaceTestsQuery,
    GetWorkspaceTestsQueryVariables
  >(
    gql`
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
    {
      endTime: endDate?.toISOString().split("T")[0],
      startTime: startDate.toISOString().split("T")[0],
      workspaceId,
    }
  );

  const testSummaries = useMemo<TestSuiteTestSummary[] | undefined>(() => {
    if (data) {
      assert(data?.node && "tests" in data.node && data.node.tests?.edges);

      return data.node.tests.edges.map(({ node }) => ({
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
  }, [data]);

  return { error, isLoading, testSummaries };
}
