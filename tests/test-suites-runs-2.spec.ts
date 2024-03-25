import { expect, test } from "@playwright/test";
import { navigateToPage } from "./utils/navigateToPage";
import { getTestRunsRow } from "./utils/getTestRunsRow";
import { openContextMenu } from "./utils/openContextMenu";
import { getContextMenuItem } from "./utils/getContextMenuItem";
import { getTestRunSections } from "./utils/getTestRunSections";

test("test-suites-runs-2: passed run in main branch with source", async ({
  page,
}) => {
  await navigateToPage({
    mockKey: "TEST_RUN_PASSED_PRIMARY_BRANCH",
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

    const tooltipText = await tooltip.textContent();
    await expect(tooltipText).toContain("1 test run passed");
    await expect(tooltipText).toContain("All 2 tests passed");

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

    const filters = page.locator('[data-test-id="TestRunTests-Filters"]');
    await expect(
      filters.locator('[data-test-name="TestStatusCapsule-failed"]')
    ).not.toBeVisible();
    await expect(
      filters.locator('[data-test-name="TestStatusCapsule-flaky"]')
    ).not.toBeVisible();
    await expect(
      await filters
        .locator('[data-test-name="TestStatusCapsule-passed"]')
        .textContent()
    ).toBe("2");

    const sections = getTestRunSections(page);
    await expect(sections).toHaveCount(1);
    const passedSection = getTestRunSections(page, "Passed");
    await expect(await passedSection.textContent()).toContain("2 Passed tests");

    const rows = page.locator('[data-test-name="TestRunTests-Row"]');
    await expect(rows).toHaveCount(0);
    await sections
      .locator('[data-test-name="ExpandableSection-ToggleButton"]')
      .click();
    await expect(rows).toHaveCount(2);
    await expect(await rows.first().textContent()).toContain("First test");
    await expect(await rows.last().textContent()).toContain("Second test");

    const metadata = page.locator('[data-test-id="TestRunTests-Metadata"]');
    const metadataText = await metadata.textContent();
    expect(metadataText).toContain("1h");
    expect(metadataText).toContain("test-user-trigger");
    expect(metadataText).toContain("main");
    expect(metadataText).toContain("200.0ms");

    await rows.first().click();
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
