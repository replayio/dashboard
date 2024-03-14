"use client";

import { setCookieValue } from "@/utils/cookie";
import { useEffect } from "react";

export function MountEffects({ workspaceId }: { workspaceId: string }) {
  useEffect(() => {
    setCookieValue("replay:dashboard:default-workspace", workspaceId);
  }, [workspaceId]);

  return null;
}
