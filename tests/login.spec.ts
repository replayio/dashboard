import { expect, test } from "@playwright/test";
import { startTest } from "./helpers";

test("should require sign-in", async ({ page }) => {
  await startTest({
    apiKey: "",
    page,
  });

  await expect(
    page.getByText("Log in to Replay to continue to Replay.")
  ).toBeVisible();
});
