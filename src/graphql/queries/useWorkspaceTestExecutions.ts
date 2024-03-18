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
  testId: string,
  startTime: string = "",
  endTime: string = ""
) {
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
            tests(
              filter: {
                testId: $testId
                startTime: $startTime
                endTime: $endTime
              }
            ) {
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
      endTime: endTime || undefined,
      startTime: startTime || undefined,
      testId,
      workspaceId,
    }
  );

  const executions = useMemo<TestSuiteTestExecution[] | undefined>(() => {
    if (data) {
      assert(data?.node && "tests" in data.node && data.node.tests?.edges);

      const executions: TestSuiteTestExecution[] = [];

      data.node.tests.edges.forEach(({ node }) => {
        node.executions.forEach((execution) => {
          executions.push({
            commitAuthor: execution.commitAuthor ?? "",
            commitTitle: execution.commitTitle ?? "",
            createdAt: new Date(execution.createdAt),
            errors: execution.errors ?? [],
            id: execution.testRunId,
            recordings: execution.recordings
              .map((recording) => ({
                buildId: recording.buildId ?? "",
                createdAt: new Date(recording.createdAt),
                duration: recording.duration ?? 0,
                id: recording.id,
                isProcessed: recording.isProcessed === true,
                title: recording.title ?? "",
                uuid: recording.uuid as string,
              }))
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
            result: execution.result as TestSuiteTestStatus,
          });
        });
      });

      return executions;
    }
  }, [data]);

  return { error, executions, isLoading };
}
