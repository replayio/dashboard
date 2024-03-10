import assert from "assert";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function useSearchParam(
  name: string
): [string | null, (value: string) => void, isPending: boolean] {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const value = searchParams?.get(name) ?? null;

  const setValue = (value: string) => {
    assert(searchParams != null);

    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return [value, setValue, isPending && searchParams != null];
}
