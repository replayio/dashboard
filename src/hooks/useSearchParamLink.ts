import { usePathname, useSearchParams } from "next/navigation";

export function useSearchParamLink(
  name: string,
  getNextValue: (value: string | null) => string | null,
  modifySearchParams?: (params: URLSearchParams) => void
): string | null {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const value = searchParams?.get(name) ?? null;
  const newValue = getNextValue(value);
  if (newValue === null) {
    return null;
  }

  let paramsString = "";
  if (searchParams) {
    const params = new URLSearchParams(searchParams);
    params.set(name, newValue);

    if (modifySearchParams) {
      modifySearchParams(params);
    }

    paramsString = params.toString();
  }

  return `${pathname}?${paramsString}`;
}
