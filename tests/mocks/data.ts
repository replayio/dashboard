import {
  GetTestsQuery,
  GetTestsRunsForWorkspaceQuery,
} from "@/graphql/generated/graphql";
import { getRelativeDate } from "@/utils/date";
import { RECORDING_ID_1, RECORDING_ID_2 } from "./constants";
import { mockGetTests } from "./utils/mockGetTests";
import { mockGetTestsRunsForWorkspace } from "./utils/mockGetTestsRunsForWorkspace";
import { partialToTestSuiteTest } from "./utils/partialToTestSuiteTest";
import { partialToTestSuiteTestRecording } from "./utils/partialToTestSuiteTestRecording";

type MockGraphQLQueries = {
  GetTests?: GetTestsQuery;
  GetTestsRunsForWorkspace?: GetTestsRunsForWorkspaceQuery;
};

export type MockGraphQLQueryKey = keyof MockGraphQLQueries;
export type MockData = { [key: string]: MockGraphQLQueries };

// Mock data represents different e2e test scenarios that could be produced by the test runner plugins.
// This data is used to create test runs and tests used to validate the behavior of the test suite dashboard.
// The recording ids listed need to be valid, non-deleted recordings
// so they are returned by the backend in the dashboard queries
// but the recordings are never opened by these tests so they do not need to be refreshed.
export const MOCK_DATA = {
  TEST_RUN_FAILED_PR: {
    GetTests: mockGetTests([
      partialToTestSuiteTest({
        id: "fake-test-id-1",
        sourcePath: undefined,
        status: "passed",
        title: "First test",
      }),
      partialToTestSuiteTest({
        id: "fake-test-id-2",
        sourcePath: undefined,
        status: "passed",
        title: "Second test",
      }),
      partialToTestSuiteTest({
        id: "fake-test-id-3",
        sourcePath: undefined,
        status: "passed",
        title: "Third test",
      }),
      partialToTestSuiteTest({
        errors: ["This is an error message"],
        id: "fake-test-id-4",
        recordings: [
          partialToTestSuiteTestRecording({
            id: RECORDING_ID_1,
          }),
          partialToTestSuiteTestRecording({
            id: RECORDING_ID_2,
          }),
        ],
        sourcePath: undefined,
        status: "flaky",
        title: "Fourth test",
      }),
      partialToTestSuiteTest({
        errors: ["This is an error message"],
        id: "fake-test-id-5",
        recordings: [
          partialToTestSuiteTestRecording({
            id: RECORDING_ID_1,
          }),
          partialToTestSuiteTestRecording({
            id: RECORDING_ID_2,
          }),
        ],
        sourcePath: undefined,
        status: "flaky",
        title: "Fifth test",
      }),
      partialToTestSuiteTest({
        errors: ["This is an error message"],
        id: "fake-test-id-6",
        sourcePath: undefined,
        status: "failed",
        title: "Sixth test",
      }),
      partialToTestSuiteTest({
        id: "fake-test-id-7",
        sourcePath: undefined,
        status: "passed",
        title: "Seventh test",
      }),
      partialToTestSuiteTest({
        errors: ["This is an error message"],
        id: "fake-test-id-8",
        recordings: [
          partialToTestSuiteTestRecording({
            id: RECORDING_ID_1,
          }),
          partialToTestSuiteTestRecording({
            id: RECORDING_ID_2,
          }),
        ],
        sourcePath: undefined,
        status: "flaky",
        title: "Eighth test",
      }),
      partialToTestSuiteTest({
        errors: ["This is an error message"],
        id: "fake-test-id-9",
        sourcePath: undefined,
        status: "failed",
        title: "Ninth test",
      }),
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
  TEST_RUN_PASSED_PRIMARY_BRANCH: {
    GetTests: mockGetTests([
      partialToTestSuiteTest({
        id: "fake-test-id-1",
        sourcePath: undefined,
        status: "passed",
        title: "First test",
      }),
      partialToTestSuiteTest({
        id: "fake-test-id-2",
        sourcePath: undefined,
        status: "passed",
        title: "Second test",
      }),
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
