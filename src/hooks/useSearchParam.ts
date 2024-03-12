import assert from "assert";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function useSearchParam(
  name: string
): [string | undefined, (value: string) => void, isPending: boolean] {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [isPending, startTransition] = useTransition();

  const value = searchParams?.get(name) ?? undefined;

  const setValue = (value: string) => {
    assert(searchParams != null);

    const url = new URL(location.href);
    url.searchParams.set(name, value);

    startTransition(() => {
      replace(url.toString());
    });
  };

  return [value, setValue, isPending && searchParams != null];
}
