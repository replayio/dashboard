import {
  GetTestsQuery,
  GetTestsQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientServer } from "@/graphql/graphQLClient";
import {
  TestSuiteTestRecording,
  TestSuiteTest,
  TestSuiteTestStatus,
  TestSuiteTestAttemptResult,
} from "@/graphql/types";
import { gql } from "@apollo/client";
import assert from "assert";

export async function getTestSuiteTests(
  workspaceId: string,
  testRunId: string
): Promise<TestSuiteTest[]> {
  const graphQLClient = await getGraphQLClientServer();
  const response = await graphQLClient.query<
    GetTestsQuery,
    GetTestsQueryVariables
  >({
    query: gql`
      query GetTests($workspaceId: ID!, $id: String!) {
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
    let numFailed = 0;
    let numPassed = 0;

    const mappedRecordings: TestSuiteTestRecording[] = [];
    test.executions.forEach(({ recordings, result }) => {
      switch (result as TestSuiteTestAttemptResult) {
        case "failed": {
          numFailed++;
          break;
        }
        case "passed": {
          numPassed++;
        }
      }

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
      status: numFailed === 0 ? "passed" : numPassed === 0 ? "failed" : "flaky",
      testId: test.testId,
      title: test.title,
    };
  });
}
