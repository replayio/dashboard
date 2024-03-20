import {
  GetTestsQuery,
  GetTestsQueryVariables,
} from "@/graphql/generated/graphql";
import {
  TestSuiteTest,
  TestSuiteTestAttemptResult,
  TestSuiteTestRecording,
} from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import assert from "assert";
import { useMemo } from "react";

export function useTestSuiteTests(
  workspaceId: string,
  testRunId: string | undefined
) {
  const { data, error, isLoading } = useGraphQLQuery<
    GetTestsQuery,
    GetTestsQueryVariables
  >(
    gql`
      query GetTests($workspaceId: ID!, $id: String!) {
        node(id: $workspaceId) {
          ... on Workspace {
            id
            testRuns(id: $id) {
              edges {
                node {
                  tests(includeNonRecorded: true) {
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
                        buildId
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
    { id: testRunId ?? "", workspaceId },

    // So this hook can be called conditionally
    { skip: testRunId === undefined }
  );

  const tests = useMemo<TestSuiteTest[] | undefined>(() => {
    if (data) {
      assert(
        data.node && "testRuns" in data.node,
        "Test run recordings could not be loaded"
      );

      if (data.node?.testRuns?.edges.length === 0) {
        return [];
      }

      const testRun = data.node?.testRuns?.edges[0];
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
              buildId: recording.buildId ?? "",
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
          id: test.testId,
          recordings: mappedRecordings,
          scope: test.scope,
          sourcePath: test.sourcePath,
          status:
            numFailed === 0 ? "passed" : numPassed === 0 ? "failed" : "flaky",
          title: test.title,
        } satisfies TestSuiteTest;
      });
    }
  }, [data]);

  return { error, isLoading, tests };
}
