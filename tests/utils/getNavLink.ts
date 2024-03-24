import { Locator, Page } from "@playwright/test";

export function getNavLink(page: Page, text: string): Locator {
  return page.locator('[data-test-name="NavLink"]', { hasText: text });
}
