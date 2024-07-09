const { defineConfig } = require("@playwright/test");
const { devices: replayDevices, replayReporter } = require("@replayio/playwright");

module.exports = defineConfig({
  reporter: [
    replayReporter({
      apiKey: process.env.REPLAY_API_KEY,
      upload: true,
    }),
    ["line"],
  ],
  projects: [
    {
      name: "replay-chromium",
      use: {
        ...replayDevices["Replay Chromium"],
      },
    },
  ],
});
