import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function useSearchParam(
  name: string
): [string | null, (value: string) => void, isPending: boolean] {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const value = searchParams.get(name);

  const setValue = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return [value, setValue, isPending];
}
