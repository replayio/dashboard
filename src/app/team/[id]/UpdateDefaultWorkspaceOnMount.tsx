"use client";

import { setCookieValue } from "@/utils/cookie";
import { useEffect } from "react";

export function UpdateDefaultWorkspaceOnMount({
  workspaceId,
}: {
  workspaceId: string;
}) {
  useEffect(() => {
    setCookieValue("replay:dashboard:default-workspace", workspaceId);
  }, [workspaceId]);

  return null;
}
