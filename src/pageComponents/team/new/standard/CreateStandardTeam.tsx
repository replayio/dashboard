import { Button } from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { Message } from "@/components/Message";
import { ReplayLogo } from "@/components/ReplayLogo";
import { SessionContext } from "@/components/SessionContext";
import { useCreateWorkspace } from "@/graphql/queries/createWorkspace";
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

  const { createWorkspace, error } = useCreateWorkspace();

  const onCreateTeam = async () => {
    if (name.trim()) {
      setIsPending(true);

      const id = await createWorkspace(
        name,
        getPlanKey({ isInternal: isInternalUser && bypassTrial, isOrg, teamType: "standard" })
      );
      if (id) {
        router.replace(`/team/${id}/recordings`);
      }

      setIsPending(true);
    }
  };

  const onGoBack = () => {
    router.push("/home");
  };

  return (
    <Message className="p-8 gap-4 text-center">
      <div className="flex flex-row gap-2">
        <ReplayLogo className="h-8 w-8 text-[#F02D5E]" />
        <div className="font-bold text-xl">Welcome to Replay</div>
      </div>
      <div>What would you like your {isOrg ? "organization" : "team"} name to be?</div>
      <div className="w-full flex flex-col gap-2">
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
                Bypass trial <small className="text-yellow-300">(internal only)</small>
              </>
            }
            onChange={value => setBypassTrial(value)}
          />
        )}
        {error && (
          <div
            className="bg-rose-950 text-rose-300 px-2 py-1 rounded font-bold w-full flex flex-row gap-2 items-center"
            data-test-id="CreateTeam-Error"
            role="alert"
          >
            <Icon className="h-4 w-4" type="warning" /> {error.message}
          </div>
        )}
      </div>
      <div className="flex flex-row gap-2 items-center">
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
