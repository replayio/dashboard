import { GetTestsQuery } from "@/graphql/generated/graphql";
import { TestSuiteTest } from "@/graphql/types";
import { MockGraphQLResponse } from "tests/mocks/types";
import { DEFAULT_WORKSPACE_ID } from "../constants";

export function mockGetTests(
  tests: TestSuiteTest[],
  workspaceId: string = DEFAULT_WORKSPACE_ID
): MockGraphQLResponse<GetTestsQuery> {
  return {
    data: {
      node: {
        __typename: "Workspace",
        id: workspaceId,
        testRuns: {
          __typename: "TestRunConnection",
          edges: [
            {
              __typename: "TestRunEdge",
              node: {
                __typename: "TestRun",
                tests: tests.map(test => ({
                  __typename: "TestRunTest",
                  testId: test.id,
                  title: test.title,
                  scope: test.scope,
                  sourcePath: test.sourcePath,
                  result: test.status,
                  errors: test.errors,
                  durationMs: test.durationMs,
                  executions: test.executions.map((execution, index) => {
                    return {
                      __typename: "TestRunTestExecution",
                      result: execution.status,
                      recordings: execution.recordings.map(recording => {
                        return {
                          __typename: "Recording",
                          buildId: recording.buildId,
                          uuid: recording.id,
                          duration: recording.duration,
                          isProcessed: recording.isProcessed,
                          createdAt: recording.createdAt.toISOString(),
                          comments: recording.numComments
                            ? Array.from({ length: recording.numComments })
                            : [],
                        };
                      }),
                    };
                  }),
                })),
              },
            },
          ],
        },
      },
    },
  };
}
