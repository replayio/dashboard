import { URLS } from "@/constants";
import { PropsWithChildren, createContext, useMemo } from "react";
import { MockDataKey } from "../../tests/mocks/data";

export type EnvironmentContextType = {
  devtoolsUrl: string | null;
  mockKey: MockDataKey | null;
};

export const EnvironmentContext = createContext<EnvironmentContextType>(
  null as any
);

export function EnvironmentContextProvider({
  children,
  devtoolsUrl,
  mockKey,
}: PropsWithChildren<{
  devtoolsUrl: string | null;
  mockKey: string | null;
}>) {
  const value = useMemo<EnvironmentContextType>(
    () => ({
      devtoolsUrl: devtoolsUrl || URLS.defaultDevtools,
      mockKey: mockKey as MockDataKey | null,
    }),
    [devtoolsUrl, mockKey]
  );

  return (
    <EnvironmentContext.Provider value={value}>
      {children}
    </EnvironmentContext.Provider>
  );
}
