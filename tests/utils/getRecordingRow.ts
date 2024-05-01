import { Locator, Page } from "@playwright/test";

export function getRecordingRow(
  page: Page,
  options: {
    title?: string;
    isWithinRetentionLimit?: boolean;
  } = {}
): Locator {
  const { isWithinRetentionLimit, title } = options;

  let selector = '[data-test-name="RecordingRow"]';
  if (isWithinRetentionLimit == true) {
    selector += "[data-status-viewable]";
  } else if (isWithinRetentionLimit == false) {
    selector += "[data-status-not-viewable]";
  }

  return page.locator(selector, { hasText: title });
}
