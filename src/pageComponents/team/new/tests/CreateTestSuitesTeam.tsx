import { Icon } from "@/components/Icon";
import { MultiStepForm } from "@/components/MultiStepForm";
import { useCreateWorkspace } from "@/graphql/queries/createWorkspace";
import { useCreateWorkspaceAPIKey } from "@/graphql/queries/createWorkspaceAPIKey";
import { PackageManager, TestRunner } from "@/pageComponents/team/new/tests/constants";
import { generateApiKey } from "@/pageComponents/team/new/tests/generateApiKey";
import { getPlanKey } from "@/utils/test-suites";
import assert from "assert";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, Suspense, lazy, startTransition, useCallback, useState } from "react";
import image from "./delorean-view.png";

const FormStep1 = lazy(() => import("@/pageComponents/team/new/tests/FormStep1"));
const FormStep2 = lazy(() => import("@/pageComponents/team/new/tests/FormStep2"));
const FormStep3 = lazy(() => import("@/pageComponents/team/new/tests/FormStep3"));

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
  const [state, setStateUnsafe] = useState<State>({
    apiKey: generateApiKey(),
    packageManager: null,
    step: 1,
    teamName: null,
    testRunner: null,
    workspaceId: null,
  });

  const setStateWithTransition = useCallback((args: Parameters<typeof setStateUnsafe>[0]) => {
    return startTransition(() => {
      setStateUnsafe(args);
    });
  }, []);

  const router = useRouter();

  const { createWorkspace, error: createWorkspaceError } = useCreateWorkspace();
  const { createApiKey, error: createApiKeyError } = useCreateWorkspaceAPIKey();

  let form: ReactNode;
  switch (state.step) {
    case 1: {
      form = (
        <FormStep1
          defaultPackageManager={state.packageManager || "npm"}
          defaultTeamName={state.teamName || undefined}
          defaultTestRunner={state.testRunner || "playwright"}
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

              setStateWithTransition({
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

            setStateWithTransition({
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

            setStateWithTransition({
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
          onBack={() => {
            assert(state.step === 3);

            setStateWithTransition({
              ...state,
              step: 2,
            });
          }}
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
    <div className="flex flex-row w-screen h-screen" data-test-id="CreateTestSuitesTeam">
      <div className="flex flex-row justify-center w-full px-16 py-16 overflow-auto md:w-3/5 grow">
        <div className="flex flex-col w-full gap-10 text-lg center-items">
          <Link className="flex flex-row items-center text-2xl text-white" href="/home">
            <Icon className="w-5 h-5" type="back-arrow" /> Back to library
          </Link>
          <MultiStepForm currentIndex={state.step - 1} steps={STEPS} />
          <Suspense>{form}</Suspense>
        </div>
      </div>
      <div className="relative flex-col justify-end hidden w-2/5 overflow-hidden md:flex">
        <Image alt="Box image" layout="fill" objectFit="cover" src={image} />
      </div>
    </div>
  );
}

const STEPS = ["Team Info", "Configuration", "Run Tests"];
