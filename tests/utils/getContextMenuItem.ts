import { Locator, Page } from "@playwright/test";

export function getContextMenuItem(page: Page, text: string): Locator {
  return page.locator('[data-test-name="ContextMenuItem"]', { hasText: text });
}
