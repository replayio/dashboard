import { expect, test } from "@playwright/test";
import { navigateToPage } from "./utils/navigateToPage";
import { getTestRunsRow } from "./utils/getTestRunsRow";
import { openContextMenu } from "./utils/openContextMenu";
import { getContextMenuItem } from "./utils/getContextMenuItem";

test("test-suites-runs-01: passed run in main branch with source", async ({
  page,
}) => {
  await navigateToPage({
    mockKey: "SUCCESS_IN_MAIN_WITH_SOURCE",
    page,
    pathname: "/team/dzowNDAyOGMwYS05ZjM1LTQ2ZjktYTkwYi1jNzJkMTIzNzUxOTI=/runs",
  });

  {
    // Test runs (1st column)

    const rows = getTestRunsRow(page);
    await expect(rows).toHaveCount(1);

    const text = await rows.textContent();
    expect(text).toContain("Successful run in main branch");
    expect(text).toContain("1h");

    await expect(
      await page
        .locator('[data-test-id="TestRuns-Stats-FailureRateLabel"]')
        .textContent()
    ).toBe("Failure rate: 0%");

    const column = page.locator('[data-test-name="TestRuns-Stats-DayColumn"]');
    await column.hover();
    const tooltip = page.locator(
      '[data-test-name="TestRuns-Stats-DayColumn-Tooltip"]'
    );
    await expect(await tooltip.textContent()).toContain("1 test run passed");

    await openContextMenu(page, "TestRuns-RunStatusFilter");
    await getContextMenuItem(page, "Only failures").click();
    await expect(rows).toHaveCount(0);

    await openContextMenu(page, "TestRuns-RunStatusFilter");
    await getContextMenuItem(page, "All runs").click();
    await expect(rows).toHaveCount(1);

    await rows.click();
  }

  {
    // Tests (2st column)

    const header = page.locator(
      '[data-test-name="TestRunTests-SectionHeader"]'
    );
    await expect(header).toHaveCount(1);
    await expect(await header.textContent()).toContain("1 Passed test");

    const rows = page.locator('[data-test-name="TestRunTests-Row"]');
    await expect(rows).toHaveCount(1);
    await expect(await rows.textContent()).toContain("First test");

    const metadata = page.locator('[data-test-id="TestRunTests-Metadata"]');
    const metadataText = await metadata.textContent();
    expect(metadataText).toContain("1h");
    expect(metadataText).toContain("test-user-trigger");
    expect(metadataText).toContain("main");
    expect(metadataText).toContain("100.0ms");

    await openContextMenu(page, "TestRun-StatusFilter");
    await getContextMenuItem(page, "Failed and flaky").click();
    await expect(rows).toHaveCount(0);

    await openContextMenu(page, "TestRun-StatusFilter");
    await getContextMenuItem(page, "All runs").click();
    await expect(rows).toHaveCount(1);

    await rows.click();
  }

  {
    // Recordings (3rd column)

    const rows = page.locator('[data-test-name="TestExecution-RecordingRow"]');
    await expect(rows).toHaveCount(1);

    const text = await rows.textContent();
    await expect(text).toContain("View recording");
    await expect(text).toContain("1h");

    const errors = page.locator('[data-test-id="TestExecution-Errors"]');
    await expect(errors).not.toBeVisible();
  }
});
