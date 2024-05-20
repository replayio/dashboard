import { Cookies } from "@/constants";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { setCookieValueClient } from "@/utils/cookie";

export function useSyncDefaultWorkspace() {
  useIsomorphicLayoutEffect(() => {
    setCookieValueClient(Cookies.defaultPathname, window.location.pathname);
  }, []);
}
