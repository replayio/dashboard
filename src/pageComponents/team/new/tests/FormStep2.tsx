import { Button } from "@/components/Button";
import { Code } from "@/components/Code";
import { CopyCode } from "@/pageComponents/team/new/tests/CopyCode";
import { Group } from "@/pageComponents/team/new/tests/Group";
import { PackageManager, TestRunner } from "@/pageComponents/team/new/tests/constants";
import { getInstallCommand } from "@/pageComponents/team/new/tests/getInstallCommand";
import { useMemo, useState } from "react";

export function FormStep2({
  apiKey,
  onContinue,
  packageManager,
  testRunner,
}: {
  apiKey: string;
  onContinue: () => void;
  packageManager: PackageManager;
  testRunner: TestRunner;
}) {
  const instructions = useMemo(() => {
    if (!packageManager || !testRunner) {
      return null;
    }

    switch (testRunner) {
      case "cypress": {
        return <CypressInstructions apiKey={apiKey} packageManager={packageManager} />;
      }
      case "playwright": {
        return <PlaywrightInstructions apiKey={apiKey} packageManager={packageManager} />;
      }
    }
  }, [apiKey, testRunner, packageManager]);

  return (
    <>
      {instructions}
      <Button
        className="self-start"
        data-test-id="CreateTeam-Continue-Button"
        onClick={onContinue}
        size="large"
      >
        Continue
      </Button>
    </>
  );
}

export function CypressInstructions({
  apiKey,
  packageManager,
}: {
  apiKey: string;
  packageManager: PackageManager;
}) {
  return (
    <>
      <Group>
        <div>1. Install the @replayio/cypress package in your project</div>
        <Code>{getInstallCommand(packageManager, "@replayio/cypress", { development: true })}</Code>
      </Group>
      <Group>
        <div>2. Add the Replay browser and Reporter to your cypress.config.ts file.</div>
        <Code>{cypressConfigCode}</Code>
      </Group>
      <Group>
        <div>3. Import Replay to your support file</div>
        <Code>{`require('@replayio/cypress/support');`}</Code>
      </Group>
      <Group>
        <div>
          4. Copy this API key to your .env file;{" "}
          <strong className="text-yellow-400">(it will only be shown once!)</strong>
        </div>
        <CopyCode text={`REPLAY_API_KEY=${apiKey}`} />
      </Group>
    </>
  );
}

export function PlaywrightInstructions({
  apiKey,
  packageManager,
}: {
  apiKey: string;
  packageManager: PackageManager;
}) {
  return (
    <>
      <Group>
        <div>1. Install the @replayio/playwright package in your project</div>
        <Code>
          {getInstallCommand(packageManager, "@replayio/playwright", { development: true })}
        </Code>
      </Group>
      <Group>
        <div>2. Add the Replay browser and Reporter to your playwright.config.ts file.</div>
        <Code>{playwrightConfigCode}</Code>
      </Group>
      <Group>
        <div>
          3. Copy this API key to your .env file;{" "}
          <strong className="text-yellow-400">(it will only be shown once!)</strong>
        </div>
        <CopyCode text={`REPLAY_API_KEY=${apiKey}`} />
      </Group>
    </>
  );
}

const cypressConfigCode = `
const { defineConfig } = require('cypress');
// Add this line to require the replay plugin
const { plugin: replayPlugin } = require('@replayio/cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Add this line to install the replay plugin
      replayPlugin(on, config, {
        upload: true,
        apiKey: process.env.REPLAY_API_KEY,
      });
      // Make sure that setupNodeEvents returns config
      return config;
    }
  }
});
`.trim();

const playwrightConfigCode = `
import { PlaywrightTestConfig, devices } from "@playwright/test";
import { devices as replayDevices } from "@replayio/playwright";

const config: PlaywrightTestConfig = {
  reporter: [["@replayio/playwright/reporter", {
    apiKey: process.env.REPLAY_API_KEY,
    upload: true
  }], ['line']],
  projects: [
    {
      name: "replay-chromium",
      use: { ...replayDevices["Replay Chromium"] },
    }
  ],
};
export default config;
`.trim();
