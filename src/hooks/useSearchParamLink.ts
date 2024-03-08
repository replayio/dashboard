import { usePathname, useSearchParams } from "next/navigation";

export function useSearchParamLink(
  name: string,
  getNextValue: (value: string | null) => string | null
): string | null {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const value = searchParams.get(name);
  const newValue = getNextValue(value);
  if (newValue === null) {
    return null;
  }

  const params = new URLSearchParams(searchParams);
  params.set(name, newValue);

  return `${pathname}?${params.toString()}`;
}
