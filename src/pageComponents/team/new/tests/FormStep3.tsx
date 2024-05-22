import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { Code } from "@/components/Code";
import { ExternalLink } from "@/components/ExternalLink";
import { Group } from "@/pageComponents/team/new/tests/Group";
import { TestRunner } from "@/pageComponents/team/new/tests/constants";

export function FormStep3({
  apiKey,
  onContinue,
  testRunner,
}: {
  apiKey: string;
  onContinue: () => void;
  testRunner: TestRunner;
}) {
  let instructions;
  switch (testRunner) {
    case "cypress": {
      instructions = <CypressInstructions apiKey={apiKey} />;
      break;
    }
    case "playwright": {
      instructions = <PlaywrightInstructions apiKey={apiKey} />;
      break;
    }
  }

  return (
    <>
      {instructions}
      <Button
        className="self-start"
        data-test-id="CreateTeam-Continue-Button"
        onClick={onContinue}
        size="large"
      >
        Go to dashboard
      </Button>
    </>
  );
}

export function CypressInstructions({ apiKey }: { apiKey: string }) {
  return (
    <Group>
      <strong>Run Cypress as you normally would</strong>
      <Code>npx cypress run --browser replay-chromium</Code>
      <ApiKeyCallout apiKey={apiKey} />
    </Group>
  );
}

export function PlaywrightInstructions({ apiKey }: { apiKey: string }) {
  return (
    <>
      <div>Now you&apos;re ready to record your tests with Replay!</div>
      <Group>
        <Code>npx playwright test --project replay-chromium</Code>
        <ApiKeyCallout apiKey={apiKey} />
      </Group>
      <div>
        We also recommend configuring your CI to record tests with Replay. Check out{" "}
        <ExternalLink href="https://docs.replay.io/test-runners/playwright/github-actions">
          our docs
        </ExternalLink>{" "}
        to see how.
      </div>
    </>
  );
}

export function ApiKeyCallout({ apiKey }: { apiKey: string }) {
  return (
    <Callout
      bodyText={
        <div className="flex flex-col gap-2">
          <div>If you&apos;ve saved it to an environment variable, you&apos;re all set.</div>
          <div>Otherwise you need to pass it explicitly:</div>
          <Code className="text-xs">REPLAY_API_KEY={apiKey} npx …</Code>
        </div>
      }
      headerText="Your API key is needed to upload replays"
      type="info"
    />
  );
}
