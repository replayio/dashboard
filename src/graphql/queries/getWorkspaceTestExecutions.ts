import {
  GetWorkspaceTestExecutionsQuery,
  GetWorkspaceTestExecutionsQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientServer } from "@/graphql/graphQLClient";
import { TestSuiteTestExecution, TestSuiteTestStatus } from "@/graphql/types";
import { gql } from "@apollo/client";
import assert from "assert";

export async function getWorkspaceTestExecutions(
  workspaceId: string,
  testId: string,
  startTime: string = "",
  endTime: string = ""
): Promise<TestSuiteTestExecution[]> {
  const graphQLClient = await getGraphQLClientServer();
  const response = await graphQLClient.query<
    GetWorkspaceTestExecutionsQuery,
    GetWorkspaceTestExecutionsQueryVariables
  >({
    query: gql`
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
    variables: {
      endTime: endTime || undefined,
      startTime: startTime || undefined,
      testId,
      workspaceId,
    },
  });

  assert(
    response.data?.node &&
      "tests" in response.data.node &&
      response.data.node.tests?.edges
  );

  const executions: TestSuiteTestExecution[] = [];

  response.data.node.tests.edges.forEach(({ node }) => {
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
