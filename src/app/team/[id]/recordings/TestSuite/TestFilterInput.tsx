"use client";

import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import { useSearchParam } from "@/hooks/useSearchParam";
import { ChangeEvent } from "react";

export function TestFilterInput() {
  const [value = "", setValue] = useSearchParam("testFilter");

  const onChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    }
  );

  return (
    <input
      className="bg-slate-950 text-white px-4 py-2 outline-none rounded grow"
      defaultValue={value}
      name="testFilter"
      onChange={onChange}
      placeholder="Filter tests"
      type="text"
    />
  );
}
