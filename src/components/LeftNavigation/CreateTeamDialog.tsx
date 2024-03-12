"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ModalDialog } from "@/components/ModalDialog";
import { useCreateWorkspace } from "@/graphql/queries/createWorkspace";
import { KeyboardEvent, useState } from "react";

export function CreateTeamDialog({ onDismiss }: { onDismiss: () => void }) {
  const [name, setName] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { createWorkspace, error } = useCreateWorkspace(
    (id) => {
      window.location.replace(`/team/${id}/recordings`);
    },
    () => {
      setIsPending(false);
    }
  );

  const onClick = () => {
    if (name.trim()) {
      setIsPending(true);
      createWorkspace(name);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "Enter":
        if (name.trim()) {
          setIsPending(true);
          createWorkspace(name);
        }
        break;
      case "Escape":
        onDismiss();
        break;
    }
  };

  return (
    <ModalDialog onDismiss={onDismiss} title="Create new team">
      <Input
        disabled={isPending}
        onChange={(event) => setName(event.currentTarget.value)}
        onKeyDown={onKeyDown}
        placeholder="Team name"
        value={name}
      />
      {error && (
        <div
          className="bg-red-400 text-red-900 px-2 py-1 rounded font-bold inline-block"
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
