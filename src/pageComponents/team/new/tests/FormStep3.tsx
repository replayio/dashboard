import { Button } from "@/components/Button";
import { Code } from "@/components/Code";
import { Group } from "@/pageComponents/team/new/tests/Group";
import { PackageManager, TestRunner } from "@/pageComponents/team/new/tests/constants";

export function FormStep3({
  onContinue,
  packageManager,
  testRunner,
}: {
  onContinue: () => void;
  packageManager: PackageManager;
  testRunner: TestRunner;
}) {
  let instructions;
  switch (testRunner) {
    case "cypress": {
      instructions = <CypressInstructions />;
      break;
    }
    case "jest": {
      instructions = <JestInstructions packageManager={packageManager} />;
      break;
    }
    case "playwright": {
      instructions = <PlaywrightInstructions />;
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

export function CypressInstructions() {
  return (
    <Group>
      <strong>5. Run cypress as you normally would</strong>
      <Code>npx cypress run --browser replay-chromium</Code>
    </Group>
  );
}

export function JestInstructions({ packageManager }: { packageManager: PackageManager }) {
  return (
    <Group>
      <strong>2. Record your tests with Replay Node</strong>
      <div>
        For example, to record all of the tests included by the &quot;test&quot; script in your
        package.json:
      </div>
      <Code>replay-node --exec {packageManager} run test</Code>
      <div>To filter which test files are run:</div>
      <Code>replay-node --exec {packageManager} run test -- specific.test.ts</Code>
    </Group>
  );
}

export function PlaywrightInstructions() {
  return (
    <Group>
      <strong>4. Run playwright as you normally would</strong>
      <Code>npx playwright test --project replay-chromium</Code>
    </Group>
  );
}
