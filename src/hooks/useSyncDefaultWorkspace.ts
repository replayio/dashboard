import { COOKIES } from "@/constants";
import { setCookieValueClient } from "@/utils/cookie";
import { useEffect } from "react";

export function useSyncDefaultWorkspace() {
  useEffect(() => {
    setCookieValueClient(COOKIES.defaultPathname, window.location.pathname);
  }, []);
}
