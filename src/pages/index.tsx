import { COOKIES } from "@/constants";
import { getCookieValue } from "@/utils/cookie";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const pathname =
      getCookieValue(COOKIES.defaultPathname) ?? "/team/me/recordings";

    window.location.replace(pathname);
  }, []);

  return null;
}
