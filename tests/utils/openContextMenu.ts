import { Page, expect } from "@playwright/test";

export async function openContextMenu(page: Page, dataTestId: string) {
  const contextMenu = page.locator('[data-test-name="ContextMenu"]');
  await expect(contextMenu).not.toBeVisible();

  await page.locator(`[data-test-id="${dataTestId}"]`).click();

  await expect(contextMenu).toBeVisible();
}
