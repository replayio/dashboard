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
      <div className="flex flex-row gap-2">
        <Button
          data-test-id="CreateTeam-Back-Button"
          onClick={onContinue}
          size="large"
          variant="outline"
        >
          Go Back
        </Button>
        <Button data-test-id="CreateTeam-Continue-Button" onClick={onContinue} size="large">
          Go to dashboard
        </Button>
      </div>
    </>
  );
}

function CypressInstructions({ apiKey }: { apiKey: string }) {
  return (
    <>
      <div>Now you&apos;re ready to record your tests with Replay!</div>
      <Group>
        <Code>npx cypress run --browser replay-chromium</Code>
        <ApiKeyCallout apiKey={apiKey} />
        <SupportInstructions />
      </Group>
      <CIInstructions href="https://docs.replay.io/test-runners/cypress-io/github-actions" />
    </>
  );
}

function PlaywrightInstructions({ apiKey }: { apiKey: string }) {
  return (
    <>
      <div>Now you&apos;re ready to record your tests with Replay!</div>
      <Group>
        <Code>npx playwright test --project replay-chromium</Code>
        <ApiKeyCallout apiKey={apiKey} />
        <SupportInstructions />
      </Group>
      <CIInstructions href="https://docs.replay.io/test-runners/playwright/github-actions" />
    </>
  );
}

function ApiKeyCallout({ apiKey }: { apiKey: string }) {
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

function CIInstructions({ href }: { href: string }) {
  return (
    <div>
      We also recommend configuring your CI to record tests with Replay. Check out{" "}
      <ExternalLink href={href}>our docs</ExternalLink> to see how.
    </div>
  );
}

function SupportInstructions() {
  return (
    <Callout
      bodyText={
        <div>
          <ExternalLink href="https://www.replay.io/contact">Let us know</ExternalLink> and we can
          help!
        </div>
      }
      headerText="Something not working?"
      type="info"
    />
  );
}
