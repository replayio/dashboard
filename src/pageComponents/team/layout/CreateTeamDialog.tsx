import { Button } from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { Input } from "@/components/Input";
import { ModalDialog } from "@/components/ModalDialog";
import { useCreateWorkspace } from "@/graphql/queries/createWorkspace";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
        isInternalUser && bypassTrial ? "team-internal-v1" : "team-v1"
      );
    }
  };

  return (
    <ModalDialog onDismiss={onDismiss} title="Create new team">
      <div className="flex flex-col gap-2">
        <Input
          disabled={isPending}
          onChange={(event) => setName(event.currentTarget.value)}
          onConfirm={onClick}
          onDismiss={onDismiss}
          placeholder="Team name"
          value={name}
        />
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
      </div>
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
    </ModalDialog>
  );
}
