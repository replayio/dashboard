import { COOKIES } from "@/constants";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { setCookieValueClient } from "@/utils/cookie";

export function useSyncDefaultWorkspace() {
  useIsomorphicLayoutEffect(() => {
    setCookieValueClient(COOKIES.defaultPathname, window.location.pathname);
  }, []);
}
