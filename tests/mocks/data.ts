import {
  GetTestsQuery,
  GetTestsRunsForWorkspaceQuery,
  GetWorkspaceMembersQuery,
  GetWorkspaceTestExecutionsQuery,
  GetWorkspaceTestsQuery,
} from "@/graphql/generated/graphql";
import { getRelativeDate } from "@/utils/date";
import { mockGetTests } from "./utils/mockGetTests";
import { mockGetTestsRunsForWorkspace } from "./utils/mockGetTestsRunsForWorkspace";
import { mockGetWorkspaceTestExecutions } from "./utils/mockGetWorkspaceTestExecutions";
import { mockGetWorkspaceTests } from "./utils/mockGetWorkspaceTests";
import { partialToTestSuiteTest } from "./utils/partialToTestSuiteTest";
import { partialToTestSuiteTestExecutionRecording } from "./utils/partialToTestSuiteTestExecutionRecording";
import { partialToTestSuiteTestRecording } from "./utils/partialToTestSuiteTestRecording";
import { mockGetWorkspaceMembers } from "./utils/mockGetWorkspaceMembers";
import { TEST_USER_PICTURES } from "./constants";

type MockGraphQLQueries = {
  // Used by /team/[id]/runs
  GetTests?: GetTestsQuery;
  GetTestsRunsForWorkspace?: GetTestsRunsForWorkspaceQuery;

  // Used by /team/[id]/tests
  GetWorkspaceTestExecutions?: GetWorkspaceTestExecutionsQuery;
  GetWorkspaceTests?: GetWorkspaceTestsQuery;

  // Team settings
  GetWorkspaceMembers?: GetWorkspaceMembersQuery;
};

export type MockGraphQLQueryKey = keyof MockGraphQLQueries;
export type MockData = { [key: string]: MockGraphQLQueries };

// Mock data represents different e2e test scenarios that could be produced by the test runner plugins.
// This data is used to create test runs and tests used to validate the behavior of the test suite dashboard.
// The recording ids listed need to be valid, non-deleted recordings
// so they are returned by the backend in the dashboard queries
// but the recordings are never opened by these tests so they do not need to be refreshed.
export const MOCK_DATA = {
  TEAM_SETTINGS_MEMBERS: {
    GetWorkspaceMembers: mockGetWorkspaceMembers([
      {
        name: "Admin 1",
        picture: TEST_USER_PICTURES.eleanor_diaz,
        roles: ["viewer", "admin"],
      },
      {
        name: "Admin 2",
        roles: ["viewer", "admin"],
      },
      {
        name: "Developer 1",
        roles: ["viewer", "developer"],
      },
      {
        isPending: true,
        name: "Pending developer 1",
        roles: ["viewer", "developer"],
      },
      {
        name: "Developer 2",
        picture: TEST_USER_PICTURES.lewis_neill,
        roles: ["viewer", "developer"],
      },
    ]),
  },
  TEST_RUN_FAILED_PR: {
    GetTests: mockGetTests([
      partialToTestSuiteTest({
        sourcePath: undefined,
        status: "passed",
        title: "First test",
      }),
      partialToTestSuiteTest({
        sourcePath: undefined,
        status: "passed",
        title: "Second test",
      }),
      partialToTestSuiteTest({
        sourcePath: undefined,
        status: "passed",
        title: "Third test",
      }),
      partialToTestSuiteTest({
        errors: ["This is an error message"],
        recordings: [
          partialToTestSuiteTestRecording(),
          partialToTestSuiteTestRecording(),
        ],
        sourcePath: undefined,
        status: "flaky",
        title: "Fourth test",
      }),
      partialToTestSuiteTest({
        errors: ["This is an error message"],
        recordings: [
          partialToTestSuiteTestRecording(),
          partialToTestSuiteTestRecording(),
        ],
        sourcePath: undefined,
        status: "flaky",
        title: "Fifth test",
      }),
      partialToTestSuiteTest({
        errors: ["This is an error message"],
        sourcePath: undefined,
        status: "failed",
        title: "Sixth test",
      }),
      partialToTestSuiteTest({
        sourcePath: undefined,
        status: "passed",
        title: "Seventh test",
      }),
      partialToTestSuiteTest({
        errors: ["This is an error message"],
        recordings: [
          partialToTestSuiteTestRecording(),
          partialToTestSuiteTestRecording(),
        ],
        sourcePath: undefined,
        status: "flaky",
        title: "Eighth test",
      }),
      partialToTestSuiteTest({
        errors: ["This is an error message"],
        sourcePath: undefined,
        status: "failed",
        title: "Ninth test",
      }),
    ]),
    GetTestsRunsForWorkspace: mockGetTestsRunsForWorkspace({
      branchName: "temp",
      commitTitle: "Failed run in temp branch",
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
        sourcePath: undefined,
        status: "passed",
        title: "First test",
      }),
      partialToTestSuiteTest({
        sourcePath: undefined,
        status: "passed",
        title: "Second test",
      }),
    ]),
    GetTestsRunsForWorkspace: mockGetTestsRunsForWorkspace({
      branchName: "main",
      commitTitle: "Successful run in main branch",
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
  TESTS_WITH_NO_RECORDINGS: {
    GetWorkspaceTestExecutions: mockGetWorkspaceTestExecutions([]),
    GetWorkspaceTests: mockGetWorkspaceTests([
      {
        stats: {
          passed: 0,
        },
        title: "No tests or recordings",
      },
      {
        stats: {
          passed: 1,
        },
        title: "1 passing test",
      },
      {
        stats: {
          flaky: 2,
          flakyRate: 1,
        },
        title: "2 flaky tests",
      },
      {
        stats: {
          failed: 1,
          failureRate: 0.25,
          flaky: 3,
          flakyRate: 0.75,
          passed: 1,
        },
        title: "1 failed test, 3 flaky tests",
      },
    ]),
  },
  TESTS_WITH_FAILURES: {
    GetWorkspaceTestExecutions: mockGetWorkspaceTestExecutions([
      {
        commitTitle: "Commit with 2 failed tests",
        recordings: [
          partialToTestSuiteTestExecutionRecording({
            createdAt: getRelativeDate({ minutesAgo: 2 }),
            isProcessed: true,
          }),
          partialToTestSuiteTestExecutionRecording({
            createdAt: getRelativeDate({ minutesAgo: 1 }),
            isProcessed: true,
          }),
        ],
        result: "failed",
      },
      {
        commitTitle: "Commit with 1 passing test",
        recordings: [partialToTestSuiteTestExecutionRecording()],
        result: "passed",
      },
    ]),
    GetWorkspaceTests: mockGetWorkspaceTests([
      {
        stats: {
          failed: 1,
          failureRate: 0.5,
          passed: 1,
        },
        title: "Failed test",
      },
    ]),
  },
  TESTS_WITH_FLAKES: {
    GetWorkspaceTestExecutions: mockGetWorkspaceTestExecutions([
      {
        commitTitle: "Commit with 3 flaky tests",
        recordings: [
          partialToTestSuiteTestExecutionRecording({
            createdAt: getRelativeDate({ minutesAgo: 1 }),
          }),
          partialToTestSuiteTestExecutionRecording({
            createdAt: getRelativeDate({ minutesAgo: 2 }),
            isProcessed: true,
          }),
          partialToTestSuiteTestExecutionRecording({
            createdAt: getRelativeDate({ minutesAgo: 3 }),
            isProcessed: true,
          }),
        ],
        result: "flaky",
      },
      {
        commitTitle: "Commit with 2 flaky tests",
        recordings: [
          partialToTestSuiteTestExecutionRecording({
            createdAt: getRelativeDate({ minutesAgo: 2 }),
            isProcessed: true,
          }),
          partialToTestSuiteTestExecutionRecording({
            createdAt: getRelativeDate({ minutesAgo: 1 }),
          }),
        ],
        result: "flaky",
      },
    ]),
    GetWorkspaceTests: mockGetWorkspaceTests([
      {
        stats: {
          flaky: 2,
          flakyRate: 1,
        },
        title: "Flaky test run",
      },
    ]),
  },
} satisfies MockData;

export type MockDataKey = keyof typeof MOCK_DATA;
