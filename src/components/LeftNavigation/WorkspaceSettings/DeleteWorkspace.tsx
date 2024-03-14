"use client";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { useDeleteWorkspace } from "@/graphql/queries/deleteWorkspace";
import { useState } from "react";

export function DeleteWorkspace({ id }: { id: string }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { deleteWorkspace } = useDeleteWorkspace();

  if (showConfirmation) {
    const handleDelete = async () => {
      await deleteWorkspace(id);

      window.location.replace("/team/me/recordings");
    };

    return (
      <div className="flex flex-col gap-4" key="confirmation">
        <div className="text-rose-500 font-bold">
          This action cannot be undone.
        </div>
        <div>
          This will permanently delete this repository and delete all of the
          replays, api-keys, sourcemaps and remove all team member associations.
        </div>
        <div className="flex flex-row items-center gap-2 text-rose-400 font-bold">
          <Button variant="outline" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleDelete}>
            Delete team
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-4">
        <div>Are you sure you want to delete this team?</div>
        <div className="flex flex-row items-center gap-1 text-rose-500 font-bold">
          This action cannot be undone{" "}
          <Icon className="w-5 h-5" type="warning" />
        </div>
        <div>
          <Button color="secondary" onClick={() => setShowConfirmation(true)}>
            Delete team
          </Button>
        </div>
      </div>
    );
  }
}
