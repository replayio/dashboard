import { Page } from "@playwright/test";
import chalk from "chalk";
import stripAnsi from "strip-ansi";

export async function debugPrint(
  page: Page | null,
  message: string,
  scope?: string
) {
  const formattedScope = scope ? `(${scope})` : "";
  console.log(message, formattedScope ? chalk.dim(formattedScope) : "");

  if (page !== null) {
    // Strip out all ANSI escape codes when we log this inside the browser.
    // Otherwise, the console messages in the recording are hard to read.
    const plainMessage = stripAnsi(message);
    await page.evaluate(
      ({ message, scope }) => {
        console.log(`${message} ${scope}`);
      },
      { message: plainMessage, scope: formattedScope }
    );
  }
}

export async function startTest({
  apiKey = process.env.TEST_USER_API_KEY,
  isTestWorkspace,
  page,
  workspaceId = "me",
}: {
  apiKey?: string;
  isTestWorkspace?: boolean;
  page: Page;
  workspaceId?: string;
}) {
  const host = process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:8080";
  const url = `${host}/team/${workspaceId}/${
    isTestWorkspace ? "runs" : "recordings"
  }?e2e=1&apiKey=${apiKey}`;

  await debugPrint(page, `Navigating to ${chalk.bold(url)}`, "startTestView");
  await page.goto(url);
}
