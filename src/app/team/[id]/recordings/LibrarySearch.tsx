"use client";

import { useSearchParam } from "@/hooks/useSearchParam";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import { formatNumber } from "@/utils/number";
import { ChangeEvent } from "react";

export function LibrarySearch({ numRecordings }: { numRecordings: number }) {
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
      placeholder={
        filterString
          ? "Searching..."
          : `Search ${formatNumber(numRecordings)} recordings`
      }
      type="text"
    />
  );
}
