import { Page } from "@playwright/test";

export async function submitInputText(page: Page, dataTestId: string, text: string) {
  const input = page.locator(`[data-test-id="${dataTestId}"]`);
  await input.fill(text);
  await page.keyboard.press("Enter");
}
