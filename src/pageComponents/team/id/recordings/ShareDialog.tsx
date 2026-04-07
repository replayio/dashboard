import { Icon, IconType } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import { Input } from "@/components/Input";
import { ModalDialog } from "@/components/ModalDialog";
import { useAddRecordingCollaborator } from "@/graphql/queries/useAddRecordingCollaborator";
import { useDeleteRecordingCollaborator } from "@/graphql/queries/useDeleteRecordingCollaborator";
import { useRecordingCollaborators } from "@/graphql/queries/useRecordingCollaborators";
import { useUpdateRecordingPrivacy } from "@/graphql/queries/useUpdateRecordingPrivacy";
import { useUpdateRecordingWorkspace } from "@/graphql/queries/useUpdateRecordingWorkspace";
import { Workspace, WorkspaceRecording } from "@/graphql/types";
import { getURL } from "@/utils/recording";
import { useCallback, useMemo, useState } from "react";

type PrivacyOption = {
  icon: IconType;
  id: string;
  label: string;
};

function usePrivacyOptions(recording: WorkspaceRecording, workspaces: Workspace[]) {
  return useMemo(() => {
    const opts: PrivacyOption[] = [];
    opts.push({ icon: "visibility-public", id: "public", label: "Anyone with the link" });
    opts.push({ icon: "visibility-private", id: "private", label: "Only people with access" });
    for (const ws of workspaces.sort((a, b) => a.name.localeCompare(b.name))) {
      opts.push({ icon: "team-members", id: `workspace:${ws.id}`, label: ws.name });
    }
    return opts;
  }, [workspaces]);
}

function currentPrivacyId(recording: WorkspaceRecording): string {
  if (!recording.private) return "public";
  if (recording.workspaceId) return `workspace:${recording.workspaceId}`;
  return "private";
}

export function ShareDialog({
  onDismiss,
  recording,
  workspaces,
}: {
  onDismiss: () => void;
  recording: WorkspaceRecording;
  workspaces: Workspace[];
}) {
  const { collaborators } = useRecordingCollaborators(recording.uuid);
  const [email, setEmail] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    addCollaborator,
    error: errorAdding,
    isLoading: addingCollaborator,
  } = useAddRecordingCollaborator(() => setEmail(""));

  const { updatePrivacy } = useUpdateRecordingPrivacy();
  const { updateWorkspace } = useUpdateRecordingWorkspace();

  const privacyOptions = usePrivacyOptions(recording, workspaces);
  const selectedId = currentPrivacyId(recording);
  const selected = privacyOptions.find(o => o.id === selectedId) ?? privacyOptions[1]!;

  const handlePrivacyChange = useCallback(
    (optionId: string) => {
      setDropdownOpen(false);
      if (optionId === selectedId) return;

      if (optionId === "public") {
        if (recording.private) updatePrivacy(recording.uuid, false);
      } else if (optionId === "private") {
        if (!recording.private) updatePrivacy(recording.uuid, true);
        if (recording.workspaceId) updateWorkspace(recording.uuid, null);
      } else if (optionId.startsWith("workspace:")) {
        const wsId = optionId.replace("workspace:", "");
        if (!recording.private) updatePrivacy(recording.uuid, true);
        if (recording.workspaceId !== wsId) updateWorkspace(recording.uuid, wsId);
      }
    },
    [recording, selectedId, updatePrivacy, updateWorkspace]
  );

  const copyUrl = useCallback(() => {
    const url = window.location.origin + getURL(recording.uuid, recording.buildId);
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [recording]);

  return (
    <ModalDialog data-test-id="Dialog-ShareRecording" onDismiss={onDismiss} title="Team">
      <div className="relative">
        <button
          type="button"
          onClick={() => setDropdownOpen(o => !o)}
          className="w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground cursor-pointer hover:bg-accent transition-colors"
        >
          <span className="truncate">{selected.label} can view</span>
          <Icon className="w-4 h-4 shrink-0 ml-2" type="drop-down-caret-down" />
        </button>
        {dropdownOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-background shadow-lg py-1 max-h-60 overflow-auto">
            {privacyOptions.map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handlePrivacyChange(opt.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left cursor-pointer hover:bg-accent transition-colors ${
                  opt.id === selectedId ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" type={opt.icon} />
                <span className="truncate">{opt.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-bold text-sm">Add People</div>
        <Input
          disabled={addingCollaborator}
          name="email"
          onChange={v => setEmail(v)}
          onConfirm={() => addCollaborator(recording.uuid, email)}
          placeholder="Email address"
          type="text"
          value={email}
        />
        {errorAdding && (
          <div className="bg-rose-600 text-white px-2 py-1 rounded text-sm">
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
      {collaborators?.map(collaborator => (
        <Collaborator
          collaborationId={collaborator.collaborationId}
          key={collaborator.collaborationId}
          name={collaborator.name}
          picture={collaborator.picture}
        />
      ))}

      <div className="border-t border-border -mx-5 px-5 pt-3 -mb-1">
        <button
          type="button"
          onClick={copyUrl}
          className="w-full flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground cursor-pointer hover:bg-accent transition-colors"
        >
          <Icon className="w-4 h-4" type="copy" />
          {copied ? "Copied!" : "Copy URL"}
        </button>
      </div>
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
      className={`flex flex-row items-center gap-2 ${isLoading ? "opacity-50" : ""}`}
      data-test-name="collaborator-row"
    >
      <div className="shrink-0 w-8 h-8 bg-neutral-700 flex items-center justify-center rounded-full overflow-hidden">
        {picture ? (
          <img alt={name} className="w-full h-full" referrerPolicy="no-referrer" src={picture} />
        ) : (
          <Icon className="w-6 h-6 fill-neutral-300" type="email" />
        )}
      </div>
      <div className="truncate">{name}</div>
      <div className="grow" />
      <div className="text-gray-500 text-sm">
        {collaborationId === null ? "Author" : "Collaborator"}
      </div>
      <div className="shrink-0 w-4 text-right">
        {collaborationId != null && (
          <IconButton disabled={isLoading} onClick={onDeleteClick} iconType="delete" />
        )}
      </div>
    </div>
  );
}
