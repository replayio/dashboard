import { Locator, Page } from "@playwright/test";

export function getLeftNavLink(page: Page, text: string): Locator {
  return page.locator('[data-test-name="LeftNavLink"]', { hasText: text });
}
