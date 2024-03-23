import { test, expect } from "@playwright/test";
import { startTest } from "./helpers";

test("should require sign-in", async ({ page }) => {
  await startTest({
    page,
  });

  await expect(
    page.getByRole("button", {
      name: "Launch Replay",
    })
  ).toBeVisible();
});
