"use client";

import { updateDefaultWorkspace } from "@/app/actions";
import { useEffect } from "react";

export function MountEffects({ workspaceId }: { workspaceId: string }) {
  useEffect(() => {
    updateDefaultWorkspace(workspaceId);
  }, [workspaceId]);

  return null;
}
