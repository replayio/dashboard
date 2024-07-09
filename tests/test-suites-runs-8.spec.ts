import { expect, test } from "@playwright/test";
import { MockGraphQLData } from "tests/mocks/types";
import { mockGetTests } from "tests/mocks/utils/mockGetTests";
import { mockGetTestsRunsForWorkspace } from "tests/mocks/utils/mockGetTestsRunsForWorkspace";
import { mockGetWorkspace } from "tests/mocks/utils/mockGetWorkspace";
import { partialToTestSuiteTest } from "tests/mocks/utils/partialToTestSuiteTest";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { navigateToPage } from "./utils/navigateToPage";
import { getRelativeDate } from "@/utils/date";

test("test-suites-runs-8: should explain missing recording if within workspace retention limits", async ({
  page,
}) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/runs`,
  });

  const testRunsRows = page.locator('[data-test-name="TestRuns-Row"]');
  await expect(testRunsRows).toHaveCount(1);
  await testRunsRows.first().click();

  const testRunRows = page.locator('[data-test-name="TestRunTests-Row"]');
  await expect(testRunRows).toHaveCount(1);
  await testRunRows.first().click();

  // The test run is within than the retention limit but missing recordings
  // (Browser crashed before recording / not recorded)
  const recordings = page.locator('[data-test-id="TestExecution-Recordings"]');
  await expect(recordings).not.toBeVisible();
  const retentionMessage = page.locator('[data-test-name="TestExecution-NoRecordingsMessage"]');
  await expect(retentionMessage).toBeVisible();
});

const mockGraphQLData: MockGraphQLData = {
  GetWorkspace: mockGetWorkspace({
    isTest: true,
    retentionLimitDays: 7,
  }),
  GetTests: mockGetTests([
    partialToTestSuiteTest({
      status: "failed",
      title: "Failed test",
      executions: [
        {
          status: "failed",
          recordings: [],
        },
      ],
    }),
  ]),
  GetTestsRunsForWorkspace: mockGetTestsRunsForWorkspace([
    {
      branchName: "temp",
      commitTitle: "Test run without recording that's within the retention limit",
      date: getRelativeDate({ daysAgo: 1 }),
      numFlaky: 1,
    },
  ]),
};
