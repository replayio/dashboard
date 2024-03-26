import { Locator, Page } from "@playwright/test";

export function getTestSummaryRow(page: Page, title?: string): Locator {
  return page.locator('[data-test-name="TestSummary-Row"]', { hasText: title });
}
