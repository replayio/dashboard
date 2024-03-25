import {
  TestRun,
  TestSuiteTest,
  TestSuiteTestRecording,
} from "@/graphql/types";
import memoizeOne from "memoize-one";

// The objects below represent different test cases that could be produced by the test runner plugins.
// This data is used to create test runs and tests used to validate the behavior of the test suite dashboard.
// The recording ids listed need to be valid, non-deleted recordings
// so they are returned by the backend in the dashboard queries
// but the recordings are never opened by these tests so they do not need to be refreshed.

export type MockTestRunWithTests = TestRun & { tests: TestSuiteTest[] };
export type MockDataKey = "SUCCESS_IN_MAIN_WITH_SOURCE";

const mockTestSuiteTestRecording: TestSuiteTestRecording = {
  buildId: "linux-chromium-20231223-9a98fcbda70c-953b4844d9c5",
  createdAt: new Date("2023-12-28"),
  duration: 0,
  id: "51ee9a7d-1599-4ceb-9237-6b07e9db6264",
  isProcessed: true,
  numComments: 0,
};

export const getMockTestRuns = memoizeOne(function getMockTestRuns(
  key: MockDataKey
): TestRun[] {
  return [MOCK_DATA[key]] as TestRun[];
});

export function getMockTests(key: MockDataKey): TestSuiteTest[] {
  const mock = MOCK_DATA[key] as MockTestRunWithTests;
  return mock.tests;
}

export const MOCK_DATA: Record<MockDataKey, MockTestRunWithTests> = {
  SUCCESS_IN_MAIN_WITH_SOURCE: {
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

    tests: [
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
    ],
  },
};
