import { getRelativeDate } from "@/utils/date";
import { expect, test } from "@playwright/test";
import { mockGetWorkspaceTestExecutions } from "tests/mocks/utils/mockGetWorkspaceTestExecutions";
import { mockGetWorkspaceTests } from "tests/mocks/utils/mockGetWorkspaceTests";
import { getContextMenuItem } from "tests/utils/getContextMenuItem";
import { openContextMenu } from "tests/utils/openContextMenu";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { MockGraphQLData } from "./mocks/types";
import { getTestSummaryRow } from "./utils/getTestSummaryRow";
import { navigateToPage } from "./utils/navigateToPage";

test("test-suites-tests-6: should show a warning when a user opens a URL linking to a test that could not be loaded", async ({
  page,
}) => {
  const warning = page.locator(
    '[data-test-id="TestSuite-TestSummaries"] [date-test-name="SelectionNotFoundWarning"]'
  );

  const rows = getTestSummaryRow(page);

  {
    // Scenario 1: Warning cleared on new selection
    await navigateToPage({
      mockGraphQLData,
      page,
      pathname: `/team/${DEFAULT_WORKSPACE_ID}/tests?testSummaryId=test-summary-id`,
    });

    // Load the page and check if the warning is displayed
    await expect(warning).toBeVisible();
    await expect(rows).toHaveCount(1);

    // Update the selected test and verify the warning is hidden
    await rows.click();
    await expect(warning).not.toBeVisible();
  }

  {
    // Scenario 1: Warning cleared if filters are updated
    await navigateToPage({
      mockGraphQLData,
      page,
      pathname: `/team/${DEFAULT_WORKSPACE_ID}/tests?testSummaryId=test-summary-id`,
    });

    // Load the page and check if the warning is displayed
    await expect(warning).toBeVisible();
    await expect(rows).toHaveCount(1);

    // Update the filters and verify the warning is still visible if the test run is still missing
    await openContextMenu(page, "Tests-DateRangeFilter");
    await getContextMenuItem(page, "Past 2 weeks").click();
    await expect(rows).toHaveCount(2);
    await expect(warning).toBeVisible();

    // Update the filters and verify the warning is hidden if the test run is now found
    await openContextMenu(page, "Tests-DateRangeFilter");
    await getContextMenuItem(page, "Past month").click();
    await expect(rows).toHaveCount(3);
    await expect(warning).not.toBeVisible();

    // Update the filters again and verify the warning stays hidden even if the test run has been filtered out again
    await openContextMenu(page, "Tests-DateRangeFilter");
    await getContextMenuItem(page, "Past week").click();
    await expect(rows).toHaveCount(1);
    await expect(warning).not.toBeVisible();
  }
});

const mockGraphQLData: MockGraphQLData = {
  GetWorkspaceTestExecutions: mockGetWorkspaceTestExecutions([]),
  GetWorkspaceTests: mockGetWorkspaceTests([
    {
      __dateUsedForTestingOnly: getRelativeDate({ daysAgo: 5 }),
      stats: {
        passed: 1,
      },
      title: "Ran this week",
    },
    {
      __dateUsedForTestingOnly: getRelativeDate({ daysAgo: 10 }),
      stats: {
        passed: 1,
      },
      title: "Ran last week",
    },
    {
      __dateUsedForTestingOnly: getRelativeDate({ daysAgo: 21 }),
      id: "test-summary-id",
      stats: {
        passed: 1,
      },
      title: "Ran three weeks ago",
    },
  ]),
};
