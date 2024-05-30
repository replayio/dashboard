import { useState } from "react";
import classnames from "classnames";

import { IconButton } from "@/components/IconButton";
import { EditableTitle } from "@/components/EditableTitle";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { ExpandableSection } from "@/pageComponents/team/id/runs/ExpandableSection";

import { RCACategory } from "@/graphql/queries/useWorkspaceRootCauseCategories";
import { useUpdateRootCauseCategory } from "@/graphql/queries/useRootCauseCategoryMutations";

export function RCACategoryRow({
  workspaceId,
  category,
}: {
  workspaceId: string;
  category: RCACategory;
}) {
  const [isPending, setIsPending] = useState(false);
  const { updateRootCauseCategory } = useUpdateRootCauseCategory();

  const { confirmationDialog: confirmRemoveDialog, showConfirmationDialog: showRemoveDialog } =
    useConfirmDialog(
      async (confirmRemove: boolean) => {
        if (confirmRemove) {
          setIsPending(true);

          try {
            // await removeUserFromWorkspace(member.membershipId);
          } finally {
            setIsPending(false);
          }
        }
      },
      {
        cancelButtonLabel: "No",
        confirmButtonLabel: "Yes, remove",
        message: `Are you sure you want to delete the category '${category.name}'?`,
        title: "Delete Category?",
      }
    );

  const actualPercentage = (category.matchingFailurePercentage * 100).toFixed(2);

  const saveName = async (newName: string) => {
    await updateRootCauseCategory(workspaceId, category.id, newName);
  };

  return (
    <div
      className={classnames(
        "flex flex-row items-center gap-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white"
      )}
      data-test-name="RCACategoryRow"
    >
      <div className="flex flex-row items-center gap-1 w-full truncate">
        <div className="flex flex-col grow truncate">
          <div className="flex flex-row">
            <div className="truncate font-bold grow">
              <EditableTitle title={category.name} saveTitle={saveName} />
            </div>
            <IconButton
              iconType="delete"
              disabled={isPending}
              onClick={showRemoveDialog}
              title="Remove category"
            />
            {confirmRemoveDialog}
          </div>

          <div>Failure percentage: {actualPercentage}%</div>
          <ExpandableSection label={<div>Discrepancies: {category.discrepancies.length}</div>}>
            <div className="flex flex-col gap-2">
              {category.discrepancies.map(discrepancy => {
                return (
                  <div key={discrepancy.id} className="flex flex-col ">
                    <div>
                      {discrepancy.eventKind}: {discrepancy.kind}
                    </div>
                    <div className="truncate font-mono">{discrepancy.key}</div>
                  </div>
                );
              })}
            </div>
          </ExpandableSection>
        </div>
      </div>
    </div>
  );
}
