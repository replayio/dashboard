const { defineConfig: defineCypressConfig } = require("cypress");
const { plugin: replayPlugin } = require("@replayio/cypress");

module.exports = defineCypressConfig({
  e2e: {
    // @ts-expect-error no "any" type
    setupNodeEvents(on, config) {
      replayPlugin(on, config, {
        upload: true,
        apiKey: process.env.REPLAY_API_KEY,
      });

      return config;
    },
  },
});
