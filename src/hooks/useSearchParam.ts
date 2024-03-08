import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSearchParam(
  name: string
): [string | null, (value: string) => void] {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const value = searchParams.get(name);

  const setValue = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    replace(`${pathname}?${params.toString()}`);
  };

  return [value, setValue];
}
