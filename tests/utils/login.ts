import { expect, Page } from "@playwright/test";
import { TEST_USER_3 } from "@/constants";

export async function login(page: Page) {
  await page.getByText("Continue with SAML SSO").click();
  await page.getByPlaceholder("Enter your email address...").fill(TEST_USER_3.email);
  await page.getByText("Continue with SAML").click();
  await page.getByLabel("Email address").fill(TEST_USER_3.email);
  await page.getByLabel("Password").fill(TEST_USER_3.password);
  await page.locator("[data-action-button-primary]").click();
}

export async function waitForLoginPage(page: Page) {
  await expect(page.getByText("Continue with SAML SSO")).toBeVisible();
}
