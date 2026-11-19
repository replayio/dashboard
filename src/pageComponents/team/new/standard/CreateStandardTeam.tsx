import { Button } from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { Message } from "@/components/Message";
import { ReplayLogo } from "@/components/ReplayLogo";
import { SessionContext } from "@/components/SessionContext";
import { BILLING_V2_PICKER_ENABLED } from "@/constants";
import { useCreateWorkspace } from "@/graphql/queries/createWorkspace";
import { useCreateWorkspaceV2 } from "@/graphql/queries/useCreateWorkspaceV2";
import { getPlanKey } from "@/utils/test-suites";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export type WorkspaceType = "team" | "org";

export function CreateStandardTeam({ type }: { type: WorkspaceType }) {
  const { user } = useContext(SessionContext);

  const isInternalUser = user?.isInternal;
  const isOrg = type === "org";

  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [bypassTrial, setBypassTrial] = useState(false);
  const [name, setName] = useState("");

  const { createWorkspace, error: legacyError } = useCreateWorkspace();
  const { createWorkspaceV2, error: v2Error } = useCreateWorkspaceV2();

  // Internal users can still opt into the legacy "bypass trial" flow even
  // when v2 is enabled, since that path needs a specific legacy plan key.
  const useV2Flow = BILLING_V2_PICKER_ENABLED && !(isInternalUser && bypassTrial);
  const error = useV2Flow ? v2Error : legacyError;

  const onCreateTeam = async () => {
    if (name.trim()) {
      setIsPending(true);

      let id: string | undefined;
      if (useV2Flow) {
        id = await createWorkspaceV2(name);
        if (id) {
          router.replace(`/team/${id}/plans`);
        }
      } else {
        id = await createWorkspace(
          name,
          getPlanKey({ isInternal: isInternalUser && bypassTrial, isOrg, teamType: "standard" })
        );
        if (id) {
          router.replace(`/team/${id}/recordings`);
        }
      }

      setIsPending(false);
    }
  };

  const onGoBack = () => {
    router.push("/home");
  };

  return (
    <Message className="p-8 lg:p-10 gap-6 text-center max-w-md">
      <div className="flex flex-row gap-2 justify-center items-center">
        <ReplayLogo className="h-8 w-8 text-[#F02D5E]" />
        <h1 className="font-semibold text-xl">Welcome to Replay</h1>
      </div>
      <p className="text-sm text-muted-foreground">
        What would you like your {isOrg ? "organization" : "team"} name to be?
      </p>
      <div className="w-full min-w-0 flex flex-col gap-4">
        <Input
          className="w-full"
          data-test-id="CreateTeam-TeamName-Input"
          disabled={isPending}
          onChange={name => setName(name)}
          onConfirm={onCreateTeam}
          placeholder={`Your ${isOrg ? "organization" : "team"} name`}
        />
        {isInternalUser && (
          <Checkbox
            checked={bypassTrial}
            disabled={isPending}
            label={
              <>
                Bypass trial <small className="text-gray-500">(internal only)</small>
              </>
            }
            onChange={value => setBypassTrial(value)}
          />
        )}
        {error && (
          <div
            className="bg-destructive/20 text-destructive px-3 py-2 rounded-md font-medium w-full flex flex-row gap-2 items-center text-sm"
            data-test-id="CreateTeam-Error"
            role="alert"
          >
            <Icon className="h-4 w-4 shrink-0" type="warning" /> {error.message}
          </div>
        )}
      </div>
      <div className="flex flex-row gap-3 justify-center">
        <Button disabled={isPending} variant="outline" onClick={onGoBack} size="large">
          Go back
        </Button>
        <Button
          data-test-id="CreateTeam-Submit-Button"
          disabled={isPending || !name}
          onClick={onCreateTeam}
          size="large"
        >
          {isOrg ? "Create new organization" : "Create new team"}
        </Button>
      </div>
    </Message>
  );
}
