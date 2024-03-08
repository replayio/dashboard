"use client";

import { PAGE_SIZE } from "@/app/team/[id]/recordings/shared";
import { Button } from "@/components/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ShowMoreButton({ maxLimit }: { maxLimit: number }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const limitString = searchParams.get("limit");
  const limit = limitString ? parseInt(limitString, 10) : PAGE_SIZE;

  if (limit >= maxLimit) {
    return null;
  }

  function onClick() {
    const newLimit = Math.min(limit + PAGE_SIZE, maxLimit);

    const params = new URLSearchParams(searchParams);
    params.set("limit", `${newLimit}`);

    replace(`${pathname}?${params.toString()}`);
  }

  return <Button onClick={onClick}>Show More</Button>;
}
