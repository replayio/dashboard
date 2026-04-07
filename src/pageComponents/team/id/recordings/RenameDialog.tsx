import { Button } from "@/components/Button";
import { ModalDialog } from "@/components/ModalDialog";
import { useUpdateRecordingTitle } from "@/graphql/queries/useUpdateRecordingTitle";
import { WorkspaceRecording } from "@/graphql/types";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

export function RenameDialog({
  onDismiss,
  recording,
}: {
  onDismiss: () => void;
  recording: WorkspaceRecording;
}) {
  const [title, setTitle] = useState(recording.title ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  const { updateRecordingTitle, isLoading } = useUpdateRecordingTitle(() => {
    onDismiss();
  });

  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef.current?.select();
    });
  }, []);

  const save = () => {
    const trimmed = title.trim();
    if (!trimmed || trimmed === recording.title) {
      onDismiss();
      return;
    }
    updateRecordingTitle(recording.uuid, trimmed);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      save();
    }
  };

  return (
    <ModalDialog data-test-id="Dialog-RenameRecording" onDismiss={onDismiss} title="Rename Replay">
      <div className="flex flex-col gap-4">
        <input
          ref={inputRef}
          autoFocus
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={onKeyDown}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Recording title"
        />
        <div className="flex flex-row gap-4">
          <Button type="button" onClick={onDismiss} variant="outline">
            Cancel
          </Button>
          <Button type="button" disabled={isLoading || !title.trim()} onClick={save}>
            {isLoading ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>
    </ModalDialog>
  );
}
