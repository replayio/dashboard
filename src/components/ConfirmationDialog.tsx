import { Button } from "@/components/Button";
import { ModalDialog } from "@/components/ModalDialog";
import { ReactNode } from "react";

export function ConfirmationDialog({
  cancelButtonLabel = "Cancel",
  confirmButtonLabel = "Confirm",
  message,
  onCancel,
  onConfirm,
  title,
}: {
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  message: ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
}) {
  return (
    <ModalDialog onDismiss={onCancel} title={title}>
      <div className="flex flex-col gap-2 max-w-[350px]">{message}</div>
      <div className="flex flex-row justify-end gap-2">
        <Button onClick={onCancel} variant="outline">
          {cancelButtonLabel}
        </Button>
        <Button color="secondary" onClick={onConfirm}>
          {confirmButtonLabel}
        </Button>
      </div>
    </ModalDialog>
  );
}
