import {
  GetTestRunRecordingsQuery,
  GetTestRunRecordingsQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientServer } from "@/graphql/graphQLClient";
import {
  TestSuiteTestRunRecording,
  TestSuiteTestRunWithRecordings,
} from "@/graphql/types";
import { gql } from "@apollo/client";
import assert from "assert";

export async function getTestSuiteTestRunRecordings(
  workspaceId: string,
  testRunId: string
): Promise<TestSuiteTestRunWithRecordings[]> {
  const graphQLClient = await getGraphQLClientServer();
  const response = await graphQLClient.query<
    GetTestRunRecordingsQuery,
    GetTestRunRecordingsQueryVariables
  >({
    query: gql`
      query GetTestRunRecordings($workspaceId: ID!, $id: String!) {
        node(id: $workspaceId) {
          ... on Workspace {
            id
            testRuns(id: $id) {
              edges {
                node {
                  tests(includeNonRecorded: true) {
                    id
                    testId
                    title
                    scope
                    sourcePath
                    result
                    errors
                    durationMs
                    executions {
                      result
                      recordings {
                        uuid
                        duration
                        isProcessed
                        createdAt
                        comments {
                          user {
                            id
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { id: testRunId, workspaceId },
  });

  assert(
    response.data.node && "testRuns" in response.data.node,
    "Test run recordings could not be loaded"
  );

  if (response.data.node?.testRuns?.edges.length === 0) {
    return [];
  }

  const testRun = response.data.node?.testRuns?.edges[0];
  assert(testRun, "Test run not found");

  return testRun.node.tests.map((test) => {
    const mappedRecordings: TestSuiteTestRunRecording[] = [];
    test.executions.forEach(({ recordings }) => {
      recordings.forEach((recording) => {
        mappedRecordings.push({
          createdAt: new Date(recording.createdAt),
          duration: recording.duration ?? 0,
          id: recording.uuid as string,
          isProcessed: recording.isProcessed === true,
          numComments: recording.comments?.length ?? 0,
        });
      });
    });

    return {
      durationMs: test.durationMs,
      errors: test.errors ?? null,
      recordings: mappedRecordings,
      scope: test.scope,
      sourcePath: test.sourcePath,
      testId: test.testId,
      title: test.title,
    };
  });
}
