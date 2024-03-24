import { resolve } from "path";
import { defineConfig, devices } from "@playwright/test";

// Read environment variables from file.
// https://github.com/motdotla/dotenv
require("dotenv").config({ path: resolve(__dirname, ".env.local") });

// See https://playwright.dev/docs/test-configuration.
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "line",
  use: {
    launchOptions: {
      // ...
    },
    viewport: {
      width: 1280,
      height: 1024,
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
