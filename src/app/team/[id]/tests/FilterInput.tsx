"use client";

import { Input } from "@/components/Input";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import { useSearchParam } from "@/hooks/useSearchParam";
import { ChangeEvent } from "react";

export function FilterInput() {
  const [value = "", setValue] = useSearchParam("filter");

  const onChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    }
  );

  return (
    <Input
      defaultValue={value}
      name="filter"
      onChange={onChange}
      placeholder="Filter tests"
      type="text"
    />
  );
}
