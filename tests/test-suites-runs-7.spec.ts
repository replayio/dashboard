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

test("test-suites-runs-6: should show a warning when a user opens a URL linking to a test that could not be loaded", async ({
  page,
}) => {
  const testRunWarning = page.locator(
    '[data-test-id="TestSuite-TestRuns"] [date-test-name="SelectionNotFoundWarning"]'
  );
  const testRunDetailsWarning = page.locator(
    '[data-test-id="TestSuite-TestRunDetails"] [date-test-name="SelectionNotFoundWarning"]'
  );

  const testRunTestsRows = page.locator('[data-test-name="TestRunTests-Row"]');

  {
    await navigateToPage({
      mockGraphQLData,
      page,
      pathname: `/team/${DEFAULT_WORKSPACE_ID}/runs?testRunId=test-run-id`,
    });

    // Set initial filters to failed-and-flaky only
    // so we can test how the page loads when a passing test is specified in the URL
    await openContextMenu(page, "TestRun-StatusFilter");
    await getContextMenuItem(page, "Failed and flaky").click();
  }

  {
    // Scenario 1: Warning cleared on new selection
    await navigateToPage({
      mockGraphQLData,
      page,
      pathname: `/team/${DEFAULT_WORKSPACE_ID}/runs?testRunId=test-run-id&testId=test-id`,
    });

    // Load the page and check if the warning is displayed
    await expect(testRunWarning).not.toBeVisible();
    await expect(testRunDetailsWarning).toBeVisible();
    await expect(testRunTestsRows).toHaveCount(1);

    // Update the selected test and verify the warning is hidden
    await testRunTestsRows.first().click();
    await expect(testRunWarning).not.toBeVisible();
    await expect(testRunDetailsWarning).not.toBeVisible();
  }

  {
    // Scenario 1: Warning cleared if filters are updated
    await navigateToPage({
      mockGraphQLData,
      page,
      pathname: `/team/${DEFAULT_WORKSPACE_ID}/runs?testRunId=test-run-id&testId=test-id`,
    });

    // Load the page and check if the warning is displayed
    await expect(testRunWarning).not.toBeVisible();
    await expect(testRunDetailsWarning).toBeVisible();
    await expect(testRunTestsRows).toHaveCount(1);

    // Update the filters and verify the warning is hidden if the test is now found
    await openContextMenu(page, "TestRun-StatusFilter");
    await getContextMenuItem(page, "All runs").click();
    await expect(testRunWarning).not.toBeVisible();
    await expect(testRunDetailsWarning).not.toBeVisible();

    // Update the filters again and verify the warning stays hidden even if the test has been filtered out again
    await openContextMenu(page, "TestRun-StatusFilter");
    await getContextMenuItem(page, "Failed and flaky").click();
    await expect(testRunWarning).not.toBeVisible();
    await expect(testRunDetailsWarning).not.toBeVisible();
  }
});

const mockGraphQLData: MockGraphQLData = {
  GetTests: mockGetTests([
    partialToTestSuiteTest({
      status: "failed",
      title: "Failed test",
    }),
    partialToTestSuiteTest({
      id: "test-id",
      status: "passed",
      title: "Passing test",
    }),
  ]),
  GetTestsRunsForWorkspace: mockGetTestsRunsForWorkspace([
    {
      commitTitle: "Ran this week",
      date: getRelativeDate({ daysAgo: 5 }),
      id: "test-run-id",
      numFailed: 1,
      numPassed: 1,
    },
  ]),
};
