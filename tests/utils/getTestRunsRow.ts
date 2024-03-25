import { Locator, Page } from "@playwright/test";

export function getTestRunsRow(page: Page, title?: string): Locator {
  return page.locator('[data-test-name="TestRuns-Row"]', { hasText: title });
}
