import {
  GetTestsQuery,
  GetTestsRunsForWorkspaceQuery,
} from "@/graphql/generated/graphql";
import {
  TestRun,
  TestSuiteTest,
  TestSuiteTestRecording,
} from "@/graphql/types";
import { getRelativeDate } from "@/utils/date";
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

const DEFAULT_WORKSPACE_ID =
  "dzowNDAyOGMwYS05ZjM1LTQ2ZjktYTkwYi1jNzJkMTIzNzUxOTI=";

type MockGraphQLQueries = {
  GetTests?: GetTestsQuery;
  GetTestsRunsForWorkspace?: GetTestsRunsForWorkspaceQuery;
};
type MockGraphQLQueryKey = keyof MockGraphQLQueries;
type MockData = { [key: string]: MockGraphQLQueries };

export const MOCK_DATA = {
  FAILED_IN_TEMP_BRANCH_WITHOUT_SOURCE: {
    GetTests: mockGetTests([
      {
        id: "fake-test-id-1",
        scope: [],
        title: "First test",
        sourcePath: "cypress/e2e/root-spec.ts",
        status: "passed",
        errors: null,
        durationMs: 100,
        recordings: [
          partialTestSuiteTestRecording("51ee9a7d-1599-4ceb-9237-6b07e9db6264"),
        ],
      },
      {
        id: "fake-test-id-2",
        scope: [],
        title: "Second test",
        sourcePath: "cypress/e2e/auth/comment-spec.ts",
        status: "passed",
        errors: null,
        durationMs: 100,
        recordings: [
          partialTestSuiteTestRecording("51ee9a7d-1599-4ceb-9237-6b07e9db6264"),
        ],
      },
      {
        id: "fake-test-id-3",
        scope: [],
        title: "Third test",
        sourcePath: "cypress/e2e/auth/profile-spec.ts",
        status: "passed",
        errors: null,
        durationMs: 100,
        recordings: [
          partialTestSuiteTestRecording("51ee9a7d-1599-4ceb-9237-6b07e9db6264"),
        ],
      },
      {
        id: "fake-test-id-4",
        scope: [],
        title: "Fourth test",
        sourcePath: "fourth-spec.ts",
        status: "flaky",
        errors: ["This is some error message"],
        durationMs: 100,
        recordings: [
          partialTestSuiteTestRecording("51ee9a7d-1599-4ceb-9237-6b07e9db6264"),
          partialTestSuiteTestRecording("227f62ce-ecc1-4a10-ad59-3948b1a8952f"),
        ],
      },
      {
        id: "fake-test-id-5",
        scope: [],
        title: "Fifth test",
        sourcePath: "fifth-test.ts",
        status: "flaky",
        errors: ["This is some error message"],
        durationMs: 100,
        recordings: [
          partialTestSuiteTestRecording("51ee9a7d-1599-4ceb-9237-6b07e9db6264"),
          partialTestSuiteTestRecording("227f62ce-ecc1-4a10-ad59-3948b1a8952f"),
        ],
      },
      {
        id: "fake-test-id-6",
        scope: [],
        title: "Sixth test",
        sourcePath: "sixth-test.ts",
        status: "failed",
        errors: ["This is some error message"],
        durationMs: 100,
        recordings: [
          partialTestSuiteTestRecording("51ee9a7d-1599-4ceb-9237-6b07e9db6264"),
        ],
      },
      {
        id: "fake-test-id-7",
        scope: [],
        title: "Seventh test",
        sourcePath: "cypress-spec.ts",
        status: "passed",
        errors: null,
        durationMs: 100,
        recordings: [
          partialTestSuiteTestRecording("51ee9a7d-1599-4ceb-9237-6b07e9db6264"),
        ],
      },
      {
        id: "fake-test-id-8",
        scope: [],
        title: "Eighth test",
        sourcePath: "cypress-spec.ts",
        status: "flaky",
        errors: ["This is some error message"],
        durationMs: 100,
        recordings: [
          partialTestSuiteTestRecording("51ee9a7d-1599-4ceb-9237-6b07e9db6264"),
          partialTestSuiteTestRecording("227f62ce-ecc1-4a10-ad59-3948b1a8952f"),
        ],
      },
      {
        id: "fake-test-id-9",
        scope: [],
        title: "Ninth test",
        sourcePath: "cypress-spec.ts",
        status: "failed",
        errors: ["This is some error message"],
        durationMs: 100,
        recordings: [
          partialTestSuiteTestRecording("51ee9a7d-1599-4ceb-9237-6b07e9db6264"),
        ],
      },
    ]),
    GetTestsRunsForWorkspace: mockGetTestsRunsForWorkspace({
      branchName: "temp",
      commitId: "fake-commit-id",
      commitTitle: "Failed run in temp branch",
      date: getRelativeDate({ hoursAgo: 1 }),
      groupLabel: null,
      id: "fake-test-run-id",
      isPrimaryBranch: false,
      numFailed: 2,
      numFlaky: 3,
      numPassed: 4,
      prNumber: 123,
      prTitle: "Pull Request Title",
      repository: null,
      triggerUrl: "https://fake-trigger-url.com",
      user: null,
    }),
  },
  SUCCESS_IN_MAIN_WITH_SOURCE: {
    GetTests: mockGetTests([
      {
        durationMs: 100,
        errors: null,
        id: "fake-test-id-1",
        recordings: [
          partialTestSuiteTestRecording("51ee9a7d-1599-4ceb-9237-6b07e9db6264"),
        ],
        scope: [],
        sourcePath: "first-test.ts",
        status: "passed",
        title: "First test",
      },
      {
        durationMs: 100,
        errors: null,
        id: "fake-test-id-2",
        recordings: [
          partialTestSuiteTestRecording("51ee9a7d-1599-4ceb-9237-6b07e9db6264"),
        ],
        scope: [],
        sourcePath: "second-test.ts",
        status: "passed",
        title: "Second test",
      },
    ]),
    GetTestsRunsForWorkspace: mockGetTestsRunsForWorkspace({
      branchName: "main",
      commitId: "fake-commit-id",
      commitTitle: "Successful run in main branch",
      date: getRelativeDate({ hoursAgo: 1 }),
      groupLabel: null,
      id: "fake-test-run-id",
      isPrimaryBranch: true,
      numFailed: 0,
      numFlaky: 0,
      numPassed: 2,
      prNumber: null,
      prTitle: null,
      repository: null,
      triggerUrl: "https://fake-trigger-url.com",
      user: "test-user-trigger",
    }),
  },
} satisfies MockData;

export type MockDataKey = keyof typeof MOCK_DATA;

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
      const mockData = (mockQueries as MockData)[
        queryName as MockGraphQLQueryKey
      ];
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
        edges: [
          {
            __typename: "TestRunEdge",
            node: {
              __typename: "TestRun",
              tests: tests.map((test) => ({
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
                      result =
                        index === test.recordings.length - 1
                          ? "passed"
                          : "failed";
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

function partialTestSuiteTestRecording(
  id: string,
  partial: Omit<Partial<TestSuiteTestRecording>, "id"> = {}
): TestSuiteTestRecording {
  return {
    buildId: "linux-chromium-20231223-9a98fcbda70c-953b4844d9c5",
    createdAt: getRelativeDate({ hoursAgo: 1 }),
    duration: 0,
    isProcessed: true,
    numComments: 0,
    id,
    ...partial,
  };
}
