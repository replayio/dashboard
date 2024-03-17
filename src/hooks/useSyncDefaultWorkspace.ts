import { setCookieValue } from "@/utils/cookie";
import { useEffect } from "react";

export function useSyncDefaultWorkspace(workspaceId: string) {
  useEffect(() => {
    setCookieValue(
      "replay:dashboard:default-pathname",
      window.location.pathname
    );
  }, []);
}
