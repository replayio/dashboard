import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { ExternalLink } from "@/components/ExternalLink";
import { useTestSuiteTestRuns } from "@/graphql/queries/useTestSuiteTestRuns";
import { Group } from "@/pageComponents/team/new/tests/Group";
import { CopyCode } from "@/pageComponents/team/new/tests/components/CopyCode";
import { TestRunner } from "@/pageComponents/team/new/tests/constants";
import { useEffect, useState } from "react";

const POLL_INTERVAL = 5_000;

export default function FormStep3({
  apiKey,
  onBack,
  onContinue,
  testRunner,
  workspaceId,
}: {
  apiKey: string;
  onBack: () => void;
  onContinue: () => void;
  testRunner: TestRunner;
  workspaceId: string;
}) {
  const [hasTestData, setHasTestData] = useState(false);

  const { refetch, testRuns } = useTestSuiteTestRuns(workspaceId, new Date());

  useEffect(() => {
    if (!hasTestData) {
      if (testRuns && testRuns.length > 0) {
        setHasTestData(true);
      } else {
        const interval = setInterval(refetch, POLL_INTERVAL);

        return () => {
          clearInterval(interval);
        };
      }
    }
  }, [hasTestData, refetch, testRuns]);

  let code;
  let githubDocsLink;
  let quickStartGuideLink;

  switch (testRunner) {
    case "cypress": {
      code = "npx cypress run --browser replay-chromium";
      githubDocsLink = "https://docs.replay.io/test-runners/cypress-io/github-actions";
      quickStartGuideLink =
        "https://docs.replay.io/basics/getting-started/record-your-cypress-tests";
      break;
    }
    case "playwright": {
      code = "npx playwright test --project replay-chromium";
      githubDocsLink = "https://docs.replay.io/test-runners/playwright/github-actions";
      quickStartGuideLink =
        "https://docs.replay.io/basics/getting-started/record-your-playwright-tests";
      break;
    }
  }

  return (
    <>
      {hasTestData || (
        <div>
          Now you&apos;re ready to record your tests with Replay!
          <br />
          Run this command and we&apos;ll tell you when your test suite is ready.
        </div>
      )}
      <Group>
        <CopyCode code={code} />
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
      </Group>
      {hasTestData ? (
        <div>
          We recommend configuring your CI to record tests with Replay.{" "}
          <ExternalLink className="text-white underline" href={githubDocsLink}>
            Check out our docs
          </ExternalLink>{" "}
          to see how.
        </div>
      ) : (
        <div>
          <div className="font-bold">Almost there! Need help?</div>
          <ul className="list-disc ml-6 mt-2">
            <li>
              Go back to the{" "}
              <span className="underline cursor-pointer" onClick={onBack}>
                configuration step
              </span>{" "}
              to double-check your config
            </li>
            <li>
              Refer to the{" "}
              <ExternalLink className="text-white underline" href={quickStartGuideLink}>
                {testRunner === "cypress" ? "Cypress" : "Playwright"} quickstart guide
              </ExternalLink>
            </li>
            <li>
              <ExternalLink className="text-white underline" href={githubDocsLink}>
                Get Replay working with CI
              </ExternalLink>
            </li>
          </ul>
        </div>
      )}
      <div className="flex flex-row gap-2">
        <Button
          data-test-id="CreateTeam-Back-Button"
          onClick={onBack}
          size="large"
          variant="outline"
        >
          Go Back
        </Button>
        <Button
          data-test-id="CreateTeam-Continue-Button"
          disabled={!hasTestData}
          onClick={hasTestData ? onContinue : undefined}
          size="large"
          variant={hasTestData ? "solid" : "outline"}
        >
          {hasTestData ? "Success! Go to the dashboard" : "Waiting for test data..."}
        </Button>
      </div>
    </>
  );
}
