import { Page } from "@playwright/test";

export async function waitForUrlChange(page: Page, prevUrl: string) {
  while (true) {
    const nextUrl = await page.url();
    if (nextUrl !== prevUrl) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }
}
