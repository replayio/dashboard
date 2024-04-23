import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { ComponentProps, ReactNode, useState } from "react";

export function useConfirmDialog(
  onConfirmedOrRejected: (confirmed: boolean) => void,
  props: Omit<ComponentProps<typeof ConfirmationDialog>, "onCancel" | "onConfirm">
) {
  const [showDialog, setShowDialog] = useState(false);

  let confirmationDialog: ReactNode = null;
  if (showDialog) {
    confirmationDialog = (
      <ConfirmationDialog
        {...props}
        onCancel={() => {
          setShowDialog(false);
          onConfirmedOrRejected(false);
        }}
        onConfirm={() => {
          setShowDialog(false);
          onConfirmedOrRejected(true);
        }}
      />
    );
  }

  return {
    confirmationDialog,
    hideConfirmationDialog: () => setShowDialog(false),
    showConfirmationDialog: () => setShowDialog(true),
  };
}
