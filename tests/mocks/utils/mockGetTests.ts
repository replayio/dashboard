import { GetTestsQuery } from "@/graphql/generated/graphql";
import { TestSuiteTest } from "@/graphql/types";
import { DEFAULT_WORKSPACE_ID } from "../constants";

export function mockGetTests(
  tests: TestSuiteTest[],
  workspaceId: string = DEFAULT_WORKSPACE_ID
): GetTestsQuery {
  return {
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
                executions: test.recordings.map((recording, index) => {
                  let result;
                  switch (test.status) {
                    case "passed":
                      result = "passed";
                      break;
                    case "failed":
                      result = "failed";
                      break;
                    case "flaky":
                      result = index === test.recordings.length - 1 ? "passed" : "failed";
                      break;
                  }

                  return {
                    __typename: "TestRunTestExecution",
                    result,
                    recordings: [
                      {
                        __typename: "Recording",
                        buildId: recording.buildId,
                        uuid: recording.id,
                        duration: recording.duration,
                        isProcessed: recording.isProcessed,
                        createdAt: recording.createdAt.toISOString(),
                        comments: recording.numComments
                          ? Array.from({ length: recording.numComments })
                          : [],
                      },
                    ],
                  };
                }),
              })),
            },
          },
        ],
      },
    },
  };
}
