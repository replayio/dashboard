import { Page, expect } from "@playwright/test";

export async function getContextMenuText(page: Page, dataTestId: string) {
  const contextMenu = await page.locator(`[data-test-id="${dataTestId}"]`);
  await expect(contextMenu).toBeVisible();

  return await contextMenu.textContent();
}
