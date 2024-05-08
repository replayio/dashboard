import { expect, test } from "@playwright/test";
import { MockGraphQLData } from "tests/mocks/types";
import { mockGetTests } from "tests/mocks/utils/mockGetTests";
import { mockGetTestsRunsForWorkspace } from "tests/mocks/utils/mockGetTestsRunsForWorkspace";
import { mockGetWorkspace } from "tests/mocks/utils/mockGetWorkspace";
import { partialToTestSuiteTest } from "tests/mocks/utils/partialToTestSuiteTest";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { navigateToPage } from "./utils/navigateToPage";
import { getRelativeDate } from "@/utils/date";
import { openContextMenu } from "tests/utils/openContextMenu";
import { getContextMenuItem } from "tests/utils/getContextMenuItem";

test("test-suites-runs-4: should respect workspace retention limits", async ({ page }) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/runs`,
  });

  // The test run is older than the retention limit, so the recordings should not be visible by default
  const testRunsRows = page.locator('[data-test-name="TestRuns-Row"]');
  await expect(testRunsRows).toHaveCount(0);

  // But they should show up if we change the filter
  await openContextMenu(page, "TestRuns-DateRangeFilter");
  await getContextMenuItem(page, "Past month").click();
  await expect(testRunsRows).toHaveCount(1);
  await testRunsRows.first().click();

  const testRunRows = page.locator('[data-test-name="TestRunTests-Row"]');
  await expect(testRunRows).toHaveCount(1);
  await testRunRows.first().click();

  // Because this test run is older than the retention limit, the recordings should not be visible
  const recordings = page.locator('[data-test-id="TestExecution-Recordings"]');
  await expect(recordings).not.toBeVisible();
  const retentionMessage = page.locator('[data-test-name="TestExecution-RetentionMessage"]');
  await expect(retentionMessage).toBeVisible();
});

const mockGraphQLData: MockGraphQLData = {
  GetWorkspace: mockGetWorkspace({
    retentionLimitDays: 7,
  }),
  GetTests: mockGetTests([
    partialToTestSuiteTest({
      sourcePath: undefined,
      status: "flaky",
      title: "Flaky test",
    }),
  ]),
  GetTestsRunsForWorkspace: mockGetTestsRunsForWorkspace([
    {
      branchName: "temp",
      commitTitle: "Test run that's older than the retention limit",
      date: getRelativeDate({ daysAgo: 14 }),
      numFlaky: 1,
    },
  ]),
};
