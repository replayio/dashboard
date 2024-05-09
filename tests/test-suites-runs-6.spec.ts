import { getRelativeDate } from "@/utils/date";
import { expect, test } from "@playwright/test";
import { MockGraphQLData } from "tests/mocks/types";
import { mockGetTests } from "tests/mocks/utils/mockGetTests";
import { mockGetTestsRunsForWorkspace } from "tests/mocks/utils/mockGetTestsRunsForWorkspace";
import { partialToTestSuiteTest } from "tests/mocks/utils/partialToTestSuiteTest";
import { getContextMenuItem } from "tests/utils/getContextMenuItem";
import { openContextMenu } from "tests/utils/openContextMenu";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { navigateToPage } from "./utils/navigateToPage";

test("test-suites-runs-6: should show a warning when a user opens a URL linking to a test run that could not be loaded", async ({
  page,
}) => {
  const testRunWarning = page.locator(
    '[data-test-id="TestSuite-TestRuns"] [date-test-name="SelectionNotFoundWarning"]'
  );
  const testRunDetailsWarning = page.locator(
    '[data-test-id="TestSuite-TestRunDetails"] [date-test-name="SelectionNotFoundWarning"]'
  );

  const testRunsRows = page.locator('[data-test-name="TestRuns-Row"]');

  {
    // Scenario 1: Warning cleared on new selection
    await navigateToPage({
      mockGraphQLData,
      page,
      pathname: `/team/${DEFAULT_WORKSPACE_ID}/runs?testRunId=test-run-id`,
    });

    // Load the page and check if the warning is displayed
    await expect(testRunWarning).toBeVisible();
    await expect(testRunDetailsWarning).not.toBeVisible();
    await expect(testRunsRows).toHaveCount(1);

    // Update the selected test and verify the warning is hidden
    await testRunsRows.first().click();
    await expect(testRunWarning).not.toBeVisible();
    await expect(testRunDetailsWarning).not.toBeVisible();
  }

  {
    // Scenario 1: Warning cleared if filters are updated
    await navigateToPage({
      mockGraphQLData,
      page,
      pathname: `/team/${DEFAULT_WORKSPACE_ID}/runs?testRunId=test-run-id`,
    });

    // Load the page and check if the warning is displayed
    await expect(testRunWarning).toBeVisible();
    await expect(testRunDetailsWarning).not.toBeVisible();
    await expect(testRunsRows).toHaveCount(1);

    // Update the filters and verify the warning is still visible if the test run is still missing
    await openContextMenu(page, "TestRuns-DateRangeFilter");
    await getContextMenuItem(page, "Past 2 weeks").click();
    await expect(testRunsRows).toHaveCount(2);
    await expect(testRunWarning).toBeVisible();
    await expect(testRunDetailsWarning).not.toBeVisible();

    // Update the filters and verify the warning is hidden if the test run is now found
    await openContextMenu(page, "TestRuns-DateRangeFilter");
    await getContextMenuItem(page, "Past month").click();
    await expect(testRunsRows).toHaveCount(3);
    await expect(testRunWarning).not.toBeVisible();
    await expect(testRunDetailsWarning).not.toBeVisible();

    // Update the filters again and verify the warning stays hidden even if the test run has been filtered out again
    await openContextMenu(page, "TestRuns-DateRangeFilter");
    await getContextMenuItem(page, "Past week").click();
    await expect(testRunsRows).toHaveCount(1);
    await expect(testRunWarning).not.toBeVisible();
    await expect(testRunDetailsWarning).not.toBeVisible();
  }
});

const mockGraphQLData: MockGraphQLData = {
  GetTests: mockGetTests([
    partialToTestSuiteTest({
      status: "passed",
      title: "Test",
    }),
  ]),
  GetTestsRunsForWorkspace: mockGetTestsRunsForWorkspace([
    {
      date: getRelativeDate({ daysAgo: 5 }),
      commitTitle: "Ran this week",
      numPassed: 1,
    },
    {
      date: getRelativeDate({ daysAgo: 10 }),
      commitTitle: "Ran last week",
      numPassed: 1,
    },
    {
      date: getRelativeDate({ daysAgo: 21 }),
      commitTitle: "Ran three weeks ago",
      id: "test-run-id",
      numPassed: 1,
    },
  ]),
};
