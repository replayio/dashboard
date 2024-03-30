import { Locator, Page } from "@playwright/test";

export function getRecordingRow(
  page: Page,
  options: {
    title?: string;
  } = {}
): Locator {
  const { title } = options;

  return page.locator('[data-test-name="RecordingRow"]', { hasText: title });
}
