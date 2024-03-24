import { expect, test } from "@playwright/test";
import { startTest } from "./helpers";

test("authentication: should require authentication to view the library", async ({
  page,
}) => {
  await startTest({
    apiKey: "",
    page,
    pathname: "/",
  });

  await expect(page.getByText("Sign in with Google")).toBeVisible();
});
