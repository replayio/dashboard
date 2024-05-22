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
      <strong>5. Run cypress as you normally would</strong>
      <Code>npx cypress run --browser replay-chromium</Code>
      <ApiKeyCallout apiKey={apiKey} />
    </Group>
  );
}

export function PlaywrightInstructions({ apiKey }: { apiKey: string }) {
  return (
    <Group>
      <strong>4. Run playwright as you normally would</strong>
      <Code>npx playwright test --project replay-chromium</Code>
      <ApiKeyCallout apiKey={apiKey} />
    </Group>
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
