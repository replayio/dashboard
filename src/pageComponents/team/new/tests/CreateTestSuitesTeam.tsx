import { Icon } from "@/components/Icon";
import { MultiStepForm } from "@/components/MultiStepForm";
import { useCreateWorkspace } from "@/graphql/queries/createWorkspace";
import { useCreateWorkspaceAPIKey } from "@/graphql/queries/createWorkspaceAPIKey";
import { FormStep1 } from "@/pageComponents/team/new/tests/FormStep1";
import { FormStep2 } from "@/pageComponents/team/new/tests/FormStep2";
import { FormStep3 } from "@/pageComponents/team/new/tests/FormStep3";
import { PackageManager, TestRunner } from "@/pageComponents/team/new/tests/constants";
import { generateApiKey } from "@/pageComponents/team/new/tests/generateApiKey";
import { getPlanKey } from "@/utils/test-suites";
import assert from "assert";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import image from "./test-suites-box.png";

type StateStep1 = {
  apiKey: string;
  packageManager: PackageManager | null;
  step: 1;
  teamName: string | null;
  testRunner: TestRunner | null;
  workspaceId: string | null;
};

type StateStep2 = {
  apiKey: string;
  packageManager: PackageManager;
  step: 2;
  teamName: string;
  testRunner: TestRunner;
  workspaceId: string;
};

type StateStep3 = Omit<StateStep2, "step"> & {
  step: 3;
  workspaceId: string;
};

type State = StateStep1 | StateStep2 | StateStep3;

export function CreateTestSuitesTeam() {
  const [state, setState] = useState<State>({
    apiKey: generateApiKey(),
    packageManager: null,
    step: 1,
    teamName: null,
    testRunner: null,
    workspaceId: null,
  });

  const router = useRouter();

  const { createWorkspace, error: createWorkspaceError } = useCreateWorkspace();
  const { createApiKey, error: createApiKeyError } = useCreateWorkspaceAPIKey();

  let form: ReactNode;
  switch (state.step) {
    case 1: {
      form = (
        <FormStep1
          defaultPackageManager={state.packageManager || undefined}
          defaultTeamName={state.teamName || undefined}
          defaultTestRunner={state.testRunner || undefined}
          errorMessage={
            createWorkspaceError
              ? createWorkspaceError.message
              : createApiKeyError
                ? createApiKeyError.message
                : undefined
          }
          onContinue={async (
            teamName: string,
            packageManager: PackageManager,
            testRunner: TestRunner
          ) => {
            assert(state.step === 1);

            let workspaceId;
            if (!workspaceId) {
              workspaceId = await createWorkspace(
                teamName,
                getPlanKey({ isOrg: false, teamType: "testsuite" })
              );

              if (!workspaceId) {
                // Workspace creation failed; GraphQL will re-render with an error message
                return false;
              }

              setState({
                ...state,
                step: 1,
                workspaceId,
              });
            }

            switch (testRunner) {
              case "cypress":
              case "playwright":
                const apiKey = await createApiKey(
                  workspaceId,
                  testRunner,
                  ["admin:all"],
                  state.apiKey
                );

                if (!apiKey) {
                  // API key creation failed; GraphQL will re-render with an error message
                  return false;
                }
                break;
            }

            setState({
              ...state,
              packageManager,
              step: 2,
              teamName,
              testRunner,
              workspaceId,
            });

            return true;
          }}
        />
      );
      break;
    }
    case 2: {
      form = (
        <FormStep2
          apiKey={state.apiKey}
          onContinue={() => {
            assert(state.step === 2);

            setState({
              ...state,
              step: 3,
            });
          }}
          packageManager={state.packageManager}
          testRunner={state.testRunner}
        />
      );
      break;
    }
    case 3: {
      form = (
        <FormStep3
          apiKey={state.apiKey}
          onContinue={() => {
            assert(state.step === 3);

            router.push(`/team/${state.workspaceId}`);
          }}
          testRunner={state.testRunner}
        />
      );
      break;
    }
  }

  return (
    <div className="flex flex-row h-screen w-screen" data-test-id="CreateTestSuitesTeam">
      <div className="grow flex flex-row justify-center w-full overflow-auto p-8">
        <div className="flex flex-col center-items gap-6 w-[505px]">
          <Link className="flex flex-row items-center text-xl text-white" href="/home">
            <Icon className="w-4 h-4" type="back-arrow" /> Back to library
          </Link>
          <MultiStepForm currentIndex={state.step - 1} steps={STEPS} />
          {form}
        </div>
      </div>
      <div className="min-w-72 grow-0 shrink bg-[#ffc22c] flex flex-col justify-end overflow-hidden">
        <Image
          alt="Box image"
          height={264}
          sizes="100vw"
          src={image}
          style={{
            minWidth: 100,
            maxWidth: "100%",
            height: "auto",
          }}
          width={512}
        />
      </div>
    </div>
  );
}

const STEPS = ["Team Info", "Configuration", "Run Tests"];
