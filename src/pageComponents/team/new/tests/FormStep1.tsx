import { Button } from "@/components/Button";
import { ExternalLink } from "@/components/ExternalLink";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Group } from "@/pageComponents/team/new/tests/Group";
import {
  DEFAULT_PACKAGE_MANAGER_OPTION,
  PACKAGE_MANAGER_OPTIONS,
  PackageManager,
  PackageManagerOption,
  TEST_RUNNER_OPTIONS,
  TestRunner,
  TestRunnerOption,
} from "@/pageComponents/team/new/tests/constants";
import assert from "assert";
import { useState } from "react";

export function FormStep1({
  defaultPackageManager,
  defaultTeamName,
  defaultTestRunner,
  errorMessage,
  onContinue,
}: {
  onContinue: (
    teamName: string,
    packageManager: PackageManager,
    testRunner: TestRunner
  ) => Promise<boolean>;
  defaultPackageManager?: PackageManager;
  defaultTeamName?: string;
  defaultTestRunner?: TestRunner;
  errorMessage: string | undefined;
}) {
  const [state, setState] = useState<{
    packageManager: PackageManagerOption;
    teamName: string;
    testRunner?: TestRunnerOption;
  }>({
    packageManager:
      PACKAGE_MANAGER_OPTIONS.find(option => option.type === defaultPackageManager) ??
      DEFAULT_PACKAGE_MANAGER_OPTION,
    teamName: defaultTeamName ?? "",
    testRunner: TEST_RUNNER_OPTIONS.find(option => option.type === defaultTestRunner),
  });

  const [isPending, setIsPending] = useState(false);

  const { packageManager, teamName, testRunner } = state;

  const isValid = !!teamName && !!packageManager && !!testRunner;

  return (
    <>
      <Group>
        <div>Choose a team name and project settings below.</div>
        <div>
          If you have any questions,{" "}
          <ExternalLink href="https://www.replay.io/contact">just ask</ExternalLink>.
        </div>
      </Group>
      <Group>
        <div>Team name</div>
        <Input
          data-test-id="CreateTestSuiteTeam-TeamName-Input"
          onChange={value =>
            setState(prevState => ({
              ...prevState,
              teamName: value,
            }))
          }
          placeholder="Your team name"
          value={teamName}
        />
      </Group>
      <Group>
        <div>Test runner</div>
        <div className="flex flex-row center-items gap-2">
          <Select
            data-test-id="CreateTestSuiteTeam-TestRunner-Select"
            onChange={value =>
              setState(prevState => ({
                ...prevState,
                testRunner: value,
              }))
            }
            options={TEST_RUNNER_OPTIONS}
            placeholder="Select a test runner"
            value={testRunner}
          />
        </div>
      </Group>
      <Group>
        <div>Package manager</div>
        <div className="flex flex-row center-items gap-2">
          <Select
            data-test-id="CreateTestSuiteTeam-PackageManager-Select"
            onChange={value =>
              setState(prevState => ({
                ...prevState,
                packageManager: value,
              }))
            }
            options={PACKAGE_MANAGER_OPTIONS}
            placeholder="Select a package manager"
            value={packageManager}
          />
        </div>
      </Group>
      {errorMessage && (
        <div className="text-red-500" data-test-id="CreateTeam-Error" role="alert">
          {errorMessage}
        </div>
      )}
      <Button
        className="self-start"
        data-test-id="CreateTeam-Continue-Button"
        disabled={!isValid || isPending}
        onClick={async () => {
          assert(testRunner);

          setIsPending(true);
          const success = await onContinue(teamName, packageManager.type, testRunner.type);
          if (!success) {
            setIsPending(false);
          }
        }}
        size="large"
      >
        {isPending ? "Saving..." : "Continue"}
      </Button>
    </>
  );
}
