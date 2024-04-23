import { expect, test } from "@playwright/test";
import { navigateToPage } from "./utils/navigateToPage";

test("releases: should list all releases, with the most recent ones at the top", async ({
  page,
}) => {
  await navigateToPage({
    apiKey: "",
    page,
    pathname: "/releases",
  });

  {
    const table = page.locator('[data-test-id="latest-releases-table"]');
    await expect(table).toBeVisible();

    const chromiumRows = table.locator('[data-test-name="release-row"][data-test-type="chromium"]');
    await expect(await chromiumRows.count()).toBeGreaterThan(1);

    const geckoRows = table.locator('[data-test-name="release-row"][data-test-type="gecko"]');
    await expect(await geckoRows.count()).toBeGreaterThan(1);

    const nodeRows = table.locator('[data-test-name="release-row"][data-test-type="node"]');
    await expect(await nodeRows.count()).toBeGreaterThan(1);
  }

  {
    const table = page.locator('[data-test-id="all-releases-table"]');
    await expect(table).toBeVisible();

    const chromiumRows = table.locator('[data-test-name="release-row"][data-test-type="chromium"]');
    await expect(await chromiumRows.count()).toBeGreaterThan(1);

    const geckoRows = table.locator('[data-test-name="release-row"][data-test-type="gecko"]');
    await expect(await geckoRows.count()).toBeGreaterThan(1);

    const nodeRows = table.locator('[data-test-name="release-row"][data-test-type="node"]');
    await expect(await nodeRows.count()).toBeGreaterThan(1);
  }
});
