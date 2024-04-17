import { Button } from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { Input } from "@/components/Input";
import { ModalDialog } from "@/components/ModalDialog";
import { useCreateWorkspace } from "@/graphql/queries/createWorkspace";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SelectTeamType from "./SelectTeamType";
import { getPlanKey } from "@/utils/test-suites";

export function CreateTeamDialog({
  isInternalUser,
  onDismiss,
}: {
  isInternalUser: boolean;
  onDismiss: () => void;
}) {
  const [bypassTrial, setBypassTrial] = useState(false);
  const [name, setName] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [teamType, setTeamType] = useState<"testsuite" | "standard">(
    "testsuite"
  );

  const router = useRouter();

  const { createWorkspace, error } = useCreateWorkspace(
    (id) => {
      router.replace(`/team/${id}/recordings`);

      onDismiss();
    },
    () => {
      setIsPending(false);
    }
  );

  const onClick = () => {
    if (name.trim()) {
      setIsPending(true);
      createWorkspace(
        name,
        getPlanKey({
          isOrg: false,
          teamType,
          isInternal: isInternalUser && bypassTrial,
        })
      );
    }
  };

  return (
    <ModalDialog onDismiss={onDismiss} title="Create new team">
      <div className="min-h-72 max-w-[400px] justify-between">
        <div className="flex flex-col gap-2">
          <label>Team name</label>
          <Input
            autoFocus
            disabled={isPending}
            onChange={(name) => setName(name)}
            onConfirm={onClick}
            onDismiss={onDismiss}
            placeholder="Team name"
            value={name}
          />
          <SelectTeamType setTeamType={setTeamType} teamType={teamType} />
          {isInternalUser && (
            <Checkbox
              checked={bypassTrial}
              disabled={isPending}
              label={
                <>
                  Bypass trial{" "}
                  <small className="text-yellow-300">(internal only)</small>
                </>
              }
              onChange={(value) => setBypassTrial(value)}
            />
          )}
          {error && (
            <div
              className="bg-rose-400 text-rose-900 px-2 py-1 rounded font-bold inline-block"
              role="alert"
            >
              {error.message}
            </div>
          )}
          <div>
            <Button disabled={!name.trim() || isPending} onClick={onClick}>
              Create
            </Button>
          </div>
        </div>
      </div>
    </ModalDialog>
  );
}
