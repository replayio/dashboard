import { Page } from "@playwright/test";
import assert from "assert";
import chalk from "chalk";
import { debugPrint } from "./debugPrint";

export async function navigateToPage({
  apiKey,
  page,
  pathname,
}: {
  apiKey?: string;
  page: Page;
  pathname: string;
}) {
  if (apiKey === undefined) {
    apiKey = process.env.TEST_USER_API_KEY;
  }

  if (pathname.startsWith("/")) {
    pathname = pathname.slice(1);
  }

  let host = process.env.APP_URL;
  assert(host, "process.env.APP_URL is required");
  if (host.endsWith("/")) {
    host = host.slice(0, -1);
  }

  const url = `${host}/${pathname}?e2e=1&apiKey=${apiKey}`;

  await debugPrint(page, `Navigating to ${chalk.bold(url)}`, "navigateToPage");
  await page.goto(url);
}
