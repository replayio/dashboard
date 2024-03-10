"use client";

import { ModalDialog } from "@/components/ModalDialog";

export function WorkspaceSettings({
  id,
  name,
  onDismiss,
}: {
  id: string;
  name: string;
  onDismiss: () => void;
}) {
  return (
    <ModalDialog onDismiss={onDismiss} title={`${name} settings`}>
      <div>Coming soon...</div>
    </ModalDialog>
  );
}
