"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ModalDialog } from "@/components/ModalDialog";
import { useCreateWorkspace } from "@/graphql/queries/createWorkspace";
import { useState } from "react";

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

  return (
    <ModalDialog onDismiss={onDismiss} title="Create new team">
      <Input
        disabled={isPending}
        onChange={(event) => setName(event.currentTarget.value)}
        onConfirm={onClick}
        onDismiss={onDismiss}
        placeholder="Team name"
        value={name}
      />
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
