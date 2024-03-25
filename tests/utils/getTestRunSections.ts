import { Page } from "@playwright/test";

export function getTestRunSections(page: Page, text?: string) {
  return page.locator('[data-test-name="TestRunTests-Section"]', {
    hasText: text,
  });
}
