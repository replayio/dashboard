import { Page } from "@playwright/test";
import assert from "assert";
import chalk from "chalk";
import { debugPrint } from "./debugPrint";
import { MockDataKey } from "../mocks/data";

export async function navigateToPage({
  apiKey,
  mockKey,
  page,
  pathname,
}: {
  apiKey?: string;
  mockKey?: MockDataKey;
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

  const url = new URL(`${host}/${pathname}`);
  url.searchParams.set("e2e", "1");
  if (apiKey) {
    url.searchParams.set("apiKey", apiKey);
  }
  if (mockKey) {
    url.searchParams.set("mockKey", mockKey);
  }

  await debugPrint(page, `Navigating to ${chalk.bold(url)}`, "navigateToPage");
  await page.goto(url.toString());
}
