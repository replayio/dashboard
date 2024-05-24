import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { ExternalLink } from "@/components/ExternalLink";
import { TabContainer } from "@/components/TabContainer";
import { CopyCode } from "@/pageComponents/team/new/tests/CopyCode";
import { Group } from "@/pageComponents/team/new/tests/Group";
import { PackageManager, TestRunner } from "@/pageComponents/team/new/tests/constants";
import { getInstallCommand } from "@/pageComponents/team/new/tests/getInstallCommand";
import { useMemo } from "react";

export default function FormStep2({
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

function CypressInstructions({
  apiKey,
  packageManager,
}: {
  apiKey: string;
  packageManager: PackageManager;
}) {
  return (
    <>
      <Group>
        <div>1. Install the @replayio/cypress package in your project.</div>
        <CopyCode
          code={getInstallCommand(packageManager, "@replayio/cypress", { development: true })}
        />
      </Group>
      <Group>
        <div>2. Install the Replay browser.</div>
        <CopyCode code="npx replayio install" />
      </Group>
      <Group>
        <div>3. Add the Replay browser and Reporter to your cypress.config.ts file.</div>
        <CopyCode code={cypressConfigCode} />
      </Group>
      <SaveApiKey apiKey={apiKey} number={4} />
      <Group>
        <div>5. Import Replay to your support file.</div>
        <CopyCode code={`require('@replayio/cypress/support');`} />
      </Group>
    </>
  );
}

function PlaywrightInstructions({
  apiKey,
  packageManager,
}: {
  apiKey: string;
  packageManager: PackageManager;
}) {
  return (
    <>
      <Group>
        <div>1. Install the @replayio/playwright package in your project.</div>
        <CopyCode
          code={getInstallCommand(packageManager, "@replayio/playwright", { development: true })}
        />
      </Group>
      <Group>
        <div>2. Install the Replay browser.</div>
        <CopyCode code="npx replayio install" />
      </Group>
      <SaveApiKey apiKey={apiKey} number={3} />
      <Group>
        <div>4. Add the Replay browser and Reporter to your playwright.config.ts file.</div>

        <TabContainer tabs={["TypeScript", "ESM", "CJS"]}>
          {(tab: string) => (
            <CopyCode
              code={
                tab === "TypeScript" ? playwrightTS : tab === "ESM" ? playwrightESM : playwrightCJS
              }
            />
          )}
        </TabContainer>
      </Group>
    </>
  );
}

function SaveApiKey({ apiKey, number }: { apiKey: string; number: number }) {
  return (
    <Group>
      <div>{number}. Save the API key below before continuing.</div>
      <CopyCode code={`REPLAY_API_KEY=${apiKey}`} />
      <Callout
        bodyText={
          <div>
            We&apos;ll only show it once. See our{" "}
            <ExternalLink href="https://docs.replay.io/ci-workflows/generate-api-key#using-your-api-key">
              &quot;Getting Started&quot; docs
            </ExternalLink>{" "}
            for more info.
          </div>
        }
        headerText="Save the API key before continuing!"
        type="warning"
      />
    </Group>
  );
}

const cypressConfigCode = `
const { defineConfig } = require('cypress');
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

const playwrightCJS = `
const {
  devices: replayDevices,
  replayReporter
} = require("@replayio/playwright");

module.exports = {
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
};
`.trim();

const playwrightESM = `
import {
  devices as replayDevices,
  replayReporter
} from "@replayio/playwright";

const config = {
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
};

export default config;
`.trim();

const playwrightTS = `
import { PlaywrightTestConfig } from "@playwright/test";
import {
  devices as replayDevices,
  replayReporter
} from "@replayio/playwright";

const config: PlaywrightTestConfig = {
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
      use: { ...replayDevices["Replay Chromium"] },
    }
  ],
};

export default config;
`.trim();
