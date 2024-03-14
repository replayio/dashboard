"use client";

import { Icon } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import { Input } from "@/components/Input";
import { ModalDialog } from "@/components/ModalDialog";
import { useAddRecordingCollaborator } from "@/graphql/queries/addRecordingCollaborator";
import { useDeleteRecordingCollaborator } from "@/graphql/queries/deleteRecordingCollaborator";
import { useRecordingCollaborators } from "@/graphql/queries/getRecordingCollaborators";
import { WorkspaceRecording } from "@/graphql/types";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export function ShareDialog({
  onDismiss,
  recording,
}: {
  onDismiss: () => void;
  recording: WorkspaceRecording;
}) {
  const collaborators = useRecordingCollaborators(recording.uuid);

  const [email, setEmail] = useState("");

  const {
    addCollaborator,
    error: errorAdding,
    loading: addingCollaborator,
  } = useAddRecordingCollaborator(() => {
    setEmail("");
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      addCollaborator(recording.uuid, email);
    }
  };

  return (
    <ModalDialog onDismiss={onDismiss} title="Share">
      <div className="flex flex-col gap-2">
        <div className="font-bold">Add people</div>
        <Input
          disabled={addingCollaborator}
          name="email"
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Email address"
          type="text"
          value={email}
        />
        {errorAdding && (
          <div className="bg-red-600 text-white px-2 py-1 rounded">
            {errorAdding.message ?? "Something went wrong"}
          </div>
        )}
      </div>
      {recording.owner && (
        <Collaborator
          collaborationId={null}
          name={recording.owner.name}
          picture={recording.owner.picture}
        />
      )}
      {collaborators.map((collaborator) => (
        <Collaborator
          collaborationId={collaborator.collaborationId}
          key={collaborator.collaborationId}
          name={collaborator.name}
          picture={collaborator.picture}
        />
      ))}
    </ModalDialog>
  );
}

function Collaborator({
  collaborationId,
  name,
  picture,
}: {
  collaborationId: string | null;
  name: string;
  picture: string;
}) {
  const { deleteCollaborator, loading: deletingCollaborator } =
    useDeleteRecordingCollaborator();

  const onDeleteClick = () => {
    if (collaborationId != null) {
      deleteCollaborator(collaborationId);
    }
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <div className="shrink-0 w-8 h-8 bg-slate-700 flex items-center justify-center rounded-full overflow-hidden">
        {picture ? (
          <img
            alt={name}
            className="w-full h-full"
            referrerPolicy="no-referrer"
            src={picture}
          />
        ) : (
          <Icon className="w-6 h-6 fill-slate-300" type="email" />
        )}
      </div>
      <div className="truncate">{name}</div>
      <div className="grow" />
      <div className="text-gray-500 text-sm">
        {collaborationId === null ? "Owner" : "Collaborator"}
      </div>
      <div className="shrink-0 w-4 text-right">
        {collaborationId != null && (
          <IconButton
            disabled={deletingCollaborator}
            onClick={onDeleteClick}
            iconType="delete"
          />
        )}
      </div>
    </div>
  );
}
