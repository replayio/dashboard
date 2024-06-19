import cypressCJS from "!raw-loader!@/pageComponents/team/new/tests/examples/cypress/config-cjs";
import cypressESM from "!raw-loader!@/pageComponents/team/new/tests/examples/cypress/config-esm";
import cypressTS from "!raw-loader!@/pageComponents/team/new/tests/examples/cypress/config-ts";
import playwrightCJS from "!raw-loader!@/pageComponents/team/new/tests/examples/playwright/config-cjs";
import playwrightESM from "!raw-loader!@/pageComponents/team/new/tests/examples/playwright/config-esm";
import playwrightTS from "!raw-loader!@/pageComponents/team/new/tests/examples/playwright/config-ts";
import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { ExternalLink } from "@/components/ExternalLink";
import { Group } from "@/pageComponents/team/new/tests/Group";
import { CodeTabContainer } from "@/pageComponents/team/new/tests/components/CodeTabContainer";
import { CopyCode } from "@/pageComponents/team/new/tests/components/CopyCode";
import { PackageManager, TestRunner } from "@/pageComponents/team/new/tests/constants";
import { getInstallCommand } from "@/pageComponents/team/new/tests/getInstallCommand";
import { useMemo } from "react";
import mixpanel from "mixpanel-browser";

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

  const handleContinueClick = () => {
    mixpanel.track("testsuite.new.step2.configuration-complete", {
      step: 2,
      packageManager: packageManager,
      testRunner: testRunner,
    });
    onContinue();
  };

  return (
    <>
      {instructions}
      <div className="pb-12">
        <Button
          className="self-start"
          data-test-id="CreateTeam-Continue-Button"
          onClick={handleContinueClick}
          size="large"
        >
          Continue
        </Button>
      </div>
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
        <div>2. Install the Replay browser</div>
        <CopyCode code="npx replayio install" />
      </Group>
      <SaveApiKey apiKey={apiKey} number={3} />
      <Group>
        <div>4. Add the Replay browser and Reporter to your cypress.config.ts file</div>
        <CodeTabContainer codeCJS={cypressCJS} codeESM={cypressESM} codeTS={cypressTS} />
      </Group>
      <Group>
        <div>5. Import Replay to your support file</div>
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
        <div className="text-xl">1. Install the @replayio/playwright package in your project</div>
        <CopyCode
          code={getInstallCommand(packageManager, "@replayio/playwright", { development: true })}
        />
      </Group>
      <Group>
        <div className="text-xl">2. Install the Replay browser.</div>
        <CopyCode code="npx replayio install" />
      </Group>
      <SaveApiKey apiKey={apiKey} number={3} />
      <Group>
        <div className="text-xl">
          4. Add the Replay browser and Reporter to your playwright.config.ts file.
        </div>
        <CodeTabContainer codeCJS={playwrightCJS} codeESM={playwrightESM} codeTS={playwrightTS} />
      </Group>
    </>
  );
}

function SaveApiKey({ apiKey, number }: { apiKey: string; number: number }) {
  return (
    <Group>
      <div className="text-xl">{number}. Save the API key below before continuing</div>
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
