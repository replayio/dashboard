import { expect, test } from "@playwright/test";
import { getContextMenuItem } from "./utils/getContextMenuItem";
import { getContextMenuText } from "./utils/getContextMenuText";
import { getNavLink } from "./utils/getNavLink";
import { navigateToPage } from "./utils/navigateToPage";
import { openContextMenu } from "./utils/openContextMenu";
import { submitInputText } from "./utils/submitInputText";

test("test-suites-filters: text and drop-down filtering", async ({ page }) => {
  await navigateToPage({
    page,
    pathname: "/team/dzowNDAyOGMwYS05ZjM1LTQ2ZjktYTkwYi1jNzJkMTIzNzUxOTI=/runs",
  });

  // Verify the test suite route has loaded based on the left-nav links
  await expect(await getNavLink(page, "Runs")).toBeVisible();
  await expect(await getNavLink(page, "Tests")).toBeVisible();
  await expect(await getNavLink(page, "Settings")).toBeVisible();

  const testRunsRows = page.locator('[data-test-name="TestRuns-Row"]');
  const testRunRows = page.locator('[data-test-name="TestRunTests-Row"]');

  // Select a random test run and test
  await expect(testRunRows).toHaveCount(0);
  await testRunsRows.first().click();
  await expect(testRunRows).not.toHaveCount(0);
  await expect(
    page.locator('[data-test-id="TestExecution"]')
  ).not.toBeVisible();
  await testRunRows.first().click();
  await expect(page.locator('[data-test-id="TestExecution"]')).toBeVisible();

  // Should filter tests by text
  await expect(testRunRows).not.toHaveCount(0);
  await submitInputText(page, "TestRun-TextFilter", "nothing-will-match-this");
  await expect(testRunRows).toHaveCount(0);
  await submitInputText(page, "TestRun-TextFilter", "");
  await expect(testRunRows).not.toHaveCount(0);

  // It's difficult to test drop-down filters because content is dynamic
  // but we can test that their most recent state is remembered after reloading the page
  await expect(await getContextMenuText(page, "TestRun-StatusFilter")).toBe(
    "All runs"
  );
  await openContextMenu(page, "TestRun-StatusFilter");
  await getContextMenuItem(page, "Failed and flaky").click();
  await page.reload();
  await testRunsRows.first().click();
  await expect(await getContextMenuText(page, "TestRun-StatusFilter")).toBe(
    "Failed and flaky"
  );

  // Should filter test runs by text
  await expect(testRunsRows).not.toHaveCount(0);
  await submitInputText(page, "TestRuns-TextFilter", "nothing-will-match-this");
  await expect(testRunsRows).toHaveCount(0);
  await submitInputText(page, "TestRuns-TextFilter", "");
  await expect(testRunsRows).not.toHaveCount(0);

  // It's difficult to test drop-down filters because content is dynamic
  // but we can test that their most recent state is remembered after reloading the page
  await expect(await getContextMenuText(page, "TestRuns-RunStatusFilter")).toBe(
    "All runs"
  );
  await expect(await getContextMenuText(page, "TestRuns-DateRangeFilter")).toBe(
    "Last 7 days"
  );
  await expect(await getContextMenuText(page, "TestRuns-BranchFilter")).toBe(
    "All branches"
  );
  await openContextMenu(page, "TestRuns-RunStatusFilter");
  await getContextMenuItem(page, "Only failures").click();
  await openContextMenu(page, "TestRuns-DateRangeFilter");
  await getContextMenuItem(page, "Last day").click();
  await openContextMenu(page, "TestRuns-BranchFilter");
  await getContextMenuItem(page, "Only primary branch").click();
  await page.reload();
  await expect(await getContextMenuText(page, "TestRuns-RunStatusFilter")).toBe(
    "Only failures"
  );
  await expect(await getContextMenuText(page, "TestRuns-DateRangeFilter")).toBe(
    "Last day"
  );
  await expect(await getContextMenuText(page, "TestRuns-BranchFilter")).toBe(
    "Only primary branch"
  );
});
