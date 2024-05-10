import { Button } from "@/components/Button";
import { ModalDialog } from "@/components/ModalDialog";
import { RunsViewContext } from "@/pageComponents/team/id/runs/TestRunsContext";
import { useContext } from "react";

export function DeepLinkWarningDialog() {
  const { dismissDeepLinkWarning, showDeepLinkWarning } = useContext(RunsViewContext);
  if (!showDeepLinkWarning) {
    return null;
  }

  return (
    <ModalDialog
      data-test-id="DeepLinkWarningDialog"
      onDismiss={dismissDeepLinkWarning}
      title="Link not found"
    >
      <div>The test you are trying to view was not found</div>
      <div className="text-xs">
        The current filter options may have hidden it or the data may be too old to load.
      </div>
      <div className="text-end">
        <Button onClick={dismissDeepLinkWarning}>Okay</Button>
      </div>
    </ModalDialog>
  );
}
