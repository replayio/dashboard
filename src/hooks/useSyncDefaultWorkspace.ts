import { COOKIES } from "@/constants";
import { setCookieValue } from "@/utils/cookie";
import { useEffect } from "react";

export function useSyncDefaultWorkspace() {
  useEffect(() => {
    setCookieValue(COOKIES.defaultPathname, window.location.pathname);
  }, []);
}
