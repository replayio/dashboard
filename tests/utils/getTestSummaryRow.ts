import { Locator, Page } from "@playwright/test";

export function getTestSummaryRow(
  page: Page,
  options: {
    selected?: boolean;
    title?: string;
  } = {}
): Locator {
  const { selected = false, title } = options;

  let selector = '[data-test-name="TestSummary-Row"]';
  if (selected) {
    selector += "[data-selected]";
  }

  return page.locator(selector, { hasText: title });
}
