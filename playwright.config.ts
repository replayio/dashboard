import { defineConfig, devices } from "@playwright/test";
import {
  createReplayReporterConfig,
  devices as replayDevices,
} from "@replayio/playwright";
import dotenv from "dotenv";
import { resolve } from "path";

// Read environment variables from file.
// https://github.com/motdotla/dotenv
dotenv.config({ path: resolve(__dirname, ".env.local") });

// See https://playwright.dev/docs/test-configuration.
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI
    ? [
        ["line"],
        createReplayReporterConfig({
          apiKey: process.env.REPLAY_API_KEY,
          upload: true,
        }) as [string, unknown],
      ]
    : "line",
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
    {
      name: "replay-chromium",
      use: { ...replayDevices["Replay Chromium"] },
    },
  ],
});
