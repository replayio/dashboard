"use client";

import { Input } from "@/components/Input";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import { useSearchParam } from "@/hooks/useSearchParam";
import { ChangeEvent } from "react";

export function TestRunsFilterInput() {
  const [value = "", setValue] = useSearchParam("testRunFilter");

  const onChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    }
  );

  return (
    <Input
      defaultValue={value}
      name="testRunFilter"
      onChange={onChange}
      placeholder="Filter"
      type="text"
    />
  );
}
