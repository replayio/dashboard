import { Icon } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import { Input } from "@/components/Input";
import { ModalDialog } from "@/components/ModalDialog";
import { useAddRecordingCollaborator } from "@/graphql/queries/useAddRecordingCollaborator";
import { useDeleteRecordingCollaborator } from "@/graphql/queries/useDeleteRecordingCollaborator";
import { useRecordingCollaborators } from "@/graphql/queries/useRecordingCollaborators";
import { WorkspaceRecording } from "@/graphql/types";
import { useState } from "react";

export function ShareDialog({
  onDismiss,
  recording,
}: {
  onDismiss: () => void;
  recording: WorkspaceRecording;
}) {
  const { collaborators } = useRecordingCollaborators(recording.uuid);
  console.log(recording);

  const [email, setEmail] = useState("");

  const {
    addCollaborator,
    error: errorAdding,
    isLoading: addingCollaborator,
  } = useAddRecordingCollaborator(() => {
    setEmail("");
  });

  return (
    <ModalDialog
      data-test-id="Dialog-ShareRecording"
      onDismiss={onDismiss}
      title="Share"
    >
      <div className="flex flex-col gap-2">
        {!recording.private && (
          <div className="bg-yellow-300 text-yellow-950 px-2 py-1 rounded flex flex-row items-center gap-2">
            <Icon className="w-4 h-4" type="visibility-public" />
            Anyone with the link can view this recording
          </div>
        )}
        <div className="font-bold">Add people</div>
        <Input
          disabled={addingCollaborator}
          name="email"
          onChange={(email) => setEmail(email)}
          onConfirm={() => addCollaborator(recording.uuid, email)}
          placeholder="Email address"
          type="text"
          value={email}
        />
        {errorAdding && (
          <div className="bg-rose-600 text-white px-2 py-1 rounded">
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
      {collaborators?.map((collaborator) => (
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
  const { deleteCollaborator, isLoading } = useDeleteRecordingCollaborator();

  const onDeleteClick = () => {
    if (collaborationId != null) {
      deleteCollaborator(collaborationId);
    }
  };

  return (
    <div
      className={`flex flex-row items-center gap-2 ${
        isLoading ? "opacity-50" : ""
      }`}
      data-test-name="collaborator-row"
    >
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
            disabled={isLoading}
            onClick={onDeleteClick}
            iconType="delete"
          />
        )}
      </div>
    </div>
  );
}
