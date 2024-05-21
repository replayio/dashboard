import { Page } from "@playwright/test";
import chalk from "chalk";
import stripAnsi from "strip-ansi";

export async function debugPrint(page: Page, message: string, scope?: string) {
  const formattedScope = scope ? `(${scope})` : "";
  if (!process.env.CI) {
    console.log(message, formattedScope ? chalk.dim(formattedScope) : "");
  }

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
