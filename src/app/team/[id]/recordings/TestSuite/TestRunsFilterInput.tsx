"use client";

import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import { useSearchParam } from "@/hooks/useSearchParam";
import { ChangeEvent } from "react";

export function TestRunsFilterInput() {
  const [filterString, setFilterString] = useSearchParam("filter");

  const onChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFilterString(event.target.value);
    }
  );

  return (
    <input
      className="bg-slate-950 text-white px-4 py-2 outline-none rounded grow"
      defaultValue={filterString ?? ""}
      onChange={onChange}
      placeholder="Filter"
      type="text"
    />
  );
}
