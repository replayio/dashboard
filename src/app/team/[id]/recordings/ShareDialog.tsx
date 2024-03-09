"use client";

import { Icon } from "@/components/Icon";
import { useAddRecordingCollaborator } from "@/graphql/queries/addRecordingCollaborator";
import { useDeleteRecordingCollaborator } from "@/graphql/queries/deleteRecordingCollaborator";
import { useRecordingCollaborators } from "@/graphql/queries/getRecordingCollaborators";
import { WorkspaceRecording } from "@/graphql/types";
import useModalDismissSignal from "@/hooks/useModalDismissSignal";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useRef,
  useState,
} from "react";

export function ShareDialog({
  onDismiss,
  recording,
}: {
  onDismiss: () => void;
  recording: WorkspaceRecording;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useModalDismissSignal(modalRef, onDismiss);

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
    <div className="backdrop-blur overflow-y-auto cursor-default fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/50">
      <div
        className="w-96 max-h-full rounded-lg shadow bg-slate-800 flex flex-col gap-4 p-4 pt-2"
        onClick={stopPropagation}
        ref={modalRef}
      >
        <div className="text-xl font-bold">Share</div>
        <div className="flex flex-col gap-2">
          <div className="font-bold">Add people</div>
          <input
            className={`bg-slate-950 text-white px-4 py-2 outline-none rounded grow ${
              addingCollaborator ? "opacity-50" : ""
            }`}
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
      </div>
    </div>
  );
}

function stopPropagation(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
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
          <img className="w-full h-full" src={picture} alt={name} />
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
          <button
            className="bg-white/10 hover:bg-white/20 p-1 rounded transition"
            disabled={deletingCollaborator}
            onClick={onDeleteClick}
          >
            <Icon className="w-4 h-4 fill-slate-300" type="delete" />
          </button>
        )}
      </div>
    </div>
  );
}
