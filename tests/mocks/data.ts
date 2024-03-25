import {
  GetTestsQuery,
  GetTestsRunsForWorkspaceQuery,
} from "@/graphql/generated/graphql";
import {
  TestRun,
  TestSuiteTest,
  TestSuiteTestRecording,
} from "@/graphql/types";
import {
  DocumentNode,
  NetworkStatus,
  QueryResult,
  TypedDocumentNode,
} from "@apollo/client";

// The objects below represent different test cases that could be produced by the test runner plugins.
// This data is used to create test runs and tests used to validate the behavior of the test suite dashboard.
// The recording ids listed need to be valid, non-deleted recordings
// so they are returned by the backend in the dashboard queries
// but the recordings are never opened by these tests so they do not need to be refreshed.

export type MockDataKey = "SUCCESS_IN_MAIN_WITH_SOURCE";

const DEFAULT_WORKSPACE_ID =
  "dzowNDAyOGMwYS05ZjM1LTQ2ZjktYTkwYi1jNzJkMTIzNzUxOTI=";

const mockTestSuiteTestRecording: TestSuiteTestRecording = {
  buildId: "linux-chromium-20231223-9a98fcbda70c-953b4844d9c5",
  createdAt: new Date("2023-12-28"),
  duration: 0,
  id: "51ee9a7d-1599-4ceb-9237-6b07e9db6264",
  isProcessed: true,
  numComments: 0,
};

export type MockGraphQLQueries = {
  GetTests?: GetTestsQuery;
  GetTestsRunsForWorkspace?: GetTestsRunsForWorkspaceQuery;
};
export type MockGraphQLQueryKey = keyof MockGraphQLQueries;

export const MOCK_DATA: Record<MockDataKey, MockGraphQLQueries> = {
  SUCCESS_IN_MAIN_WITH_SOURCE: {
    GetTests: mockGetTests([
      {
        durationMs: 100,
        errors: null,
        id: "first-test-id",
        recordings: [mockTestSuiteTestRecording],
        scope: [],
        sourcePath: "first-test.ts",
        status: "passed",
        title: "First test",
      },
      {
        durationMs: 100,
        errors: null,
        id: "second-test-id",
        recordings: [mockTestSuiteTestRecording],
        scope: [],
        sourcePath: "second-test.ts",
        status: "passed",
        title: "Second test",
      },
    ]),
    GetTestsRunsForWorkspace: mockGetTestsRunsForWorkspace({
      branchName: "main",
      commitId: "1234-commit-id",
      commitTitle: "Successful run in main branch",
      date: new Date(),
      groupLabel: null,
      id: "fake-id",
      isPrimaryBranch: true,
      numFailed: 0,
      numFlaky: 0,
      numPassed: 2,
      prNumber: 123,
      prTitle: "Successful Pull Request Title",
      repository: null,
      triggerUrl: "http://example.com",
      user: "test-user-trigger",
    }),
  },
};

export function getMockData<Query>(
  mockKey: MockDataKey | null,
  query: DocumentNode | TypedDocumentNode<Query, any>
):
  | Pick<QueryResult<Query, any>, "data" | "error" | "loading" | "refetch">
  | undefined {
  const mockQueries = mockKey ? MOCK_DATA[mockKey] : undefined;
  if (mockQueries) {
    const definition = query.definitions[0];
    if (definition && "name" in definition && definition.name) {
      const queryName = definition.name.value;
      const mockData = mockQueries[queryName as MockGraphQLQueryKey];
      if (mockData) {
        return {
          data: mockData as any,
          error: undefined,
          loading: false,
          refetch: async () => ({
            data: mockData as any,
            error: undefined,
            loading: false,
            networkStatus: NetworkStatus.ready,
          }),
        };
      }
    }
  }
}

// Helper methods ensure that mock data is in the correct shape for the GraphQL queries it represents

function mockGetTestsRunsForWorkspace(
  testRun: TestRun,
  workspaceId: string = DEFAULT_WORKSPACE_ID
): GetTestsRunsForWorkspaceQuery {
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
              id: testRun.id,
              date: testRun.date.toISOString(),
              mode: null,
              results: {
                __typename: "TestRunResults",
                counts: {
                  __typename: "TestRunStats",
                  failed: testRun.numFailed,
                  flaky: testRun.numFlaky,
                  passed: testRun.numPassed,
                },
              },
              source: {
                __typename: "TestRunSource",
                commitId: testRun.commitId,
                commitTitle: testRun.commitTitle,
                groupLabel: testRun.groupLabel,
                isPrimaryBranch: testRun.isPrimaryBranch,
                branchName: testRun.branchName,
                prNumber: testRun.prNumber,
                prTitle: testRun.prTitle,
                repository: testRun.repository,
                triggerUrl: testRun.triggerUrl,
                user: testRun.user,
              },
            },
          },
        ],
      },
    },
  };
}

function mockGetTests(
  tests: TestSuiteTest[],
  workspaceId: string = DEFAULT_WORKSPACE_ID
): GetTestsQuery {
  return {
    node: {
      __typename: "Workspace",
      id: workspaceId,
      testRuns: {
        __typename: "TestRunConnection",
        edges: tests.map((test) => ({
          __typename: "TestRunEdge",
          node: {
            __typename: "TestRun",
            tests: [
              {
                __typename: "TestRunTest",
                testId: test.id,
                title: test.title,
                scope: test.scope,
                sourcePath: test.sourcePath,
                result: test.status,
                errors: test.errors,
                durationMs: test.durationMs,
                executions: test.recordings.map((recording) => {
                  let result;
                  switch (test.status) {
                    case "passed":
                      result = "passed";
                      break;
                    case "failed":
                      result = "failed";
                      break;
                    case "flaky":
                      result = "passed";
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
              },
            ],
          },
        })),
      },
    },
  };
}
