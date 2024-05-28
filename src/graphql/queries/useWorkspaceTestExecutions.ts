import {
  GetWorkspaceTestExecutionsQuery,
  GetWorkspaceTestExecutionsQueryVariables,
} from "@/graphql/generated/graphql";
import { TestSuiteTestExecution, TestSuiteTestStatus } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import assert from "assert";
import { useMemo } from "react";

export function useWorkspaceTestExecutions(
  workspaceId: string,
  testId: string | undefined,
  startDate?: Date,
  endDate?: Date
) {
  const endTime = endDate ? endDate.toISOString().substring(0, 10) : undefined;
  const startTime = startDate ? startDate.toISOString().substring(0, 10) : undefined;

  const { data, error, isLoading } = useGraphQLQuery<
    GetWorkspaceTestExecutionsQuery,
    GetWorkspaceTestExecutionsQueryVariables
  >(
    gql`
      query GetWorkspaceTestExecutions(
        $workspaceId: ID!
        $testId: String
        $startTime: String
        $endTime: String
      ) {
        node(id: $workspaceId) {
          ... on Workspace {
            id
            tests(filter: { testId: $testId, startTime: $startTime, endTime: $endTime }) {
              edges {
                node {
                  executions {
                    testRunId
                    errors
                    createdAt
                    commitTitle
                    commitAuthor
                    result
                    recordings {
                      buildId
                      id
                      uuid
                      title
                      testResult
                      isProcessed
                      duration
                      createdAt
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      endTime,
      startTime,
      testId,
      workspaceId,
    },

    // So this hook can be called conditionally
    { skip: testId === undefined }
  );

  const executions = useMemo<TestSuiteTestExecution[] | undefined>(() => {
    if (data) {
      assert(data?.node && "tests" in data.node && data.node.tests?.edges);

      const executions: TestSuiteTestExecution[] = [];

      data.node.tests.edges.forEach(({ node }) => {
        node.executions.forEach(execution => {
          executions.push({
            commitAuthor: execution.commitAuthor ?? "",
            commitTitle: execution.commitTitle ?? "",
            createdAt: new Date(execution.createdAt),
            errors: execution.errors ?? [],
            id: execution.testRunId,
            recordings: execution.recordings
              .map(recording => ({
                buildId: recording.buildId ?? "",
                createdAt: new Date(recording.createdAt),
                duration: recording.duration ?? 0,
                id: recording.id,
                isProcessed: recording.isProcessed === true,
                testResult: (recording.testResult ?? "failed") as TestSuiteTestStatus,
                title: recording.title ?? "",
                uuid: recording.uuid as string,
              }))
              // Newest to oldest
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
            status: execution.result as TestSuiteTestStatus,
          });
        });
      });

      // Newest to oldest
      return executions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
  }, [data]);

  return { error, executions, isLoading };
}
