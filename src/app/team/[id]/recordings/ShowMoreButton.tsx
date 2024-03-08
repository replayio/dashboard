"use client";

import { PAGE_SIZE } from "@/app/team/[id]/recordings/shared";
import { Button } from "@/components/Button";
import { useSearchParam } from "@/hooks/useSearchParam";

export function ShowMoreButton({ maxLimit }: { maxLimit: number }) {
  const [limitString, setLimitString] = useSearchParam("limit");

  const limit = limitString ? parseInt(limitString, 10) : PAGE_SIZE;

  if (limit >= maxLimit) {
    return null;
  }
  function onClick() {
    const newLimit = Math.min(limit + PAGE_SIZE, maxLimit);

    setLimitString("" + newLimit);
  }

  return <Button onClick={onClick}>Show More</Button>;
}
