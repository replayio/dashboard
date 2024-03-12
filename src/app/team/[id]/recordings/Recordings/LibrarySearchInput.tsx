"use client";

import { useSearchParam } from "@/hooks/useSearchParam";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import { formatNumber } from "@/utils/number";
import { ChangeEvent } from "react";

export function LibrarySearchInput({
  numRecordings,
}: {
  numRecordings: number;
}) {
  const [value = "", setValue] = useSearchParam("recordingFilter");

  const onChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    }
  );

  return (
    <input
      className="bg-slate-950 text-white px-4 py-2 outline-none rounded grow"
      defaultValue={value}
      onChange={onChange}
      placeholder={
        value
          ? "Searching..."
          : `Search ${formatNumber(numRecordings)} recordings`
      }
      type="text"
    />
  );
}
