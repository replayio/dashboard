"use client";

import { getCookieValue } from "@/utils/cookie";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const id = getCookieValue("replay:dashboard:default-workspace") ?? "me";

    window.location.replace(`/team/${id}/recordings`);
  }, []);

  return null;
}
