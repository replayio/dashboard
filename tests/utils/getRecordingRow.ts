import { Locator, Page } from "@playwright/test";

export function getRecordingRow(page: Page, title?: string): Locator {
  return page.locator('[data-test-name="RecordingRow"]', { hasText: title });
}
