import { Button } from "@/components/Button";
import { ModalDialog } from "@/components/ModalDialog";

export function DeepLinkWarningDialog({
  onDismiss,
  visible,
}: {
  onDismiss: () => void;
  visible: boolean;
}) {
  if (!visible) {
    return null;
  }

  return (
    <ModalDialog data-test-id="DeepLinkWarningDialog" onDismiss={onDismiss} title="Link not found">
      <div>The test you are trying to view was not found</div>
      <div className="text-xs">
        The current filter options may have hidden it or the data may be too old to load.
      </div>
      <div className="text-end">
        <Button onClick={onDismiss}>Okay</Button>
      </div>
    </ModalDialog>
  );
}
