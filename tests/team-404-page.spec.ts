import { test, expect } from "@playwright/test";
import { navigateToPage } from "./utils/navigateToPage";
import { getLeftNavLink } from "./utils/getLeftNavLink";
import { getContextMenuItem } from "./utils/getContextMenuItem";
import { getRecordingRow } from "./utils/getRecordingRow";

test("team-404-page: should be shown when a user does not have access to a team", async ({
  page,
}) => {
  await navigateToPage({
    page,
    pathname: "/team/this-is-not-a-valid-id=/recordings",
  });

  await expect(await page.textContent("body")).toContain("Sorry, you don't have permission!");

  const button = page.locator('[data-test-id="Button-GoHome"]');
  await button.isVisible();
  await button.click();

  const activeLink = page.locator('[data-test-name="LeftNavLink"][data-is-active="true"]');
  await expect(await activeLink.textContent()).toBe("Home");
});
