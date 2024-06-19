import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { ExternalLink } from "@/components/ExternalLink";
import { Group } from "@/pageComponents/team/new/tests/Group";
import { CopyCode } from "@/pageComponents/team/new/tests/components/CopyCode";
import { TestRunner } from "@/pageComponents/team/new/tests/constants";
import mixpanel from "mixpanel-browser";

export default function FormStep3({
  apiKey,
  onBack,
  onContinue,
  testRunner,
}: {
  apiKey: string;
  onBack: () => void;
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

  const handleBack = () => {
    mixpanel.track("testsuite.new.step3.back-to-configuration", {
      step: 3,
      testRunner: testRunner,
    });
    onBack();
  };

  const handleContinue = () => {
    mixpanel.track("testsuite.new.step3.return-to-dashboard", {
      step: 3,
      testRunner: testRunner,
    });
    onContinue();
  };

  return (
    <>
      {instructions}
      <div className="flex flex-row gap-2">
        <Button
          data-test-id="CreateTeam-Back-Button"
          onClick={handleBack}
          size="large"
          variant="outline"
        >
          Go Back
        </Button>
        <Button data-test-id="CreateTeam-Continue-Button" onClick={handleContinue} size="large">
          Go to dashboard
        </Button>
      </div>
    </>
  );
}

function CypressInstructions({ apiKey }: { apiKey: string }) {
  const code = "npx cypress run --browser replay-chromium";

  return (
    <>
      <div>Now you&apos;re ready to record your tests with Replay!</div>
      <Group>
        <CopyCode code={code} />
        <ApiKeyCallout apiKey={apiKey} code={code} />
      </Group>
      <CIInstructions href="https://docs.replay.io/test-runners/cypress-io/github-actions" />
    </>
  );
}

function PlaywrightInstructions({ apiKey }: { apiKey: string }) {
  const code = "npx playwright test --project replay-chromium";

  return (
    <>
      <div>Now you&apos;re ready to record your tests with Replay!</div>
      <Group>
        <CopyCode code={code} />
        <ApiKeyCallout apiKey={apiKey} code={code} />
      </Group>
      <CIInstructions href="https://docs.replay.io/test-runners/playwright/github-actions" />
    </>
  );
}

function ApiKeyCallout({ apiKey, code }: { apiKey: string; code: string }) {
  return (
    <Callout
      bodyText={
        <div className="flex flex-col gap-2 grow">
          <div>If you&apos;ve saved it to an environment variable, you&apos;re all set.</div>
          <div>Otherwise you need to pass it explicitly:</div>
          <CopyCode
            code={`REPLAY_API_KEY=${apiKey} npx …`}
            codeToCopy={`REPLAY_API_KEY=${apiKey} ${code}`}
            size="small"
          />
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
