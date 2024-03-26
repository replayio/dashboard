import { Locator, Page } from "@playwright/test";

export function getTestExecutionRow(page: Page, title?: string): Locator {
  return page.locator('[data-test-name="TestExecution-Row"]', {
    hasText: title,
  });
}
