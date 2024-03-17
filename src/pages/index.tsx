import { getCookieValue } from "@/utils/cookie";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const pathname =
      getCookieValue("replay:dashboard:default-pathname") ??
      "/team/me/recordings";

    window.location.replace(pathname);
  }, []);

  return null;
}
