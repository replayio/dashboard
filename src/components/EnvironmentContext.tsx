import { URLS } from "@/constants";
import { PropsWithChildren, createContext, useMemo } from "react";
import { MockDataKey } from "../../tests/mocks/data";

export type EnvironmentContextType = {
  devtoolsUrl: string | null;
  devtoolsLegacyUrl: string | null;
  mockKey: MockDataKey | null;
};

export const EnvironmentContext = createContext<EnvironmentContextType>(
  null as any
);

export function EnvironmentContextProvider({
  children,
  devtoolsUrl,
  devtoolsLegacyUrl,
  mockKey,
}: PropsWithChildren<{
  devtoolsUrl: string | null;
  devtoolsLegacyUrl: string | null;
  mockKey: string | null;
}>) {
  const value = useMemo<EnvironmentContextType>(
    () => ({
      devtoolsUrl: devtoolsUrl || URLS.defaultDevtools,
      devtoolsLegacyUrl: devtoolsLegacyUrl || URLS.defaultDevtoolsLegacy,
      mockKey: mockKey as MockDataKey | null,
    }),
    [devtoolsUrl, devtoolsLegacyUrl, mockKey]
  );

  return (
    <EnvironmentContext.Provider value={value}>
      {children}
    </EnvironmentContext.Provider>
  );
}
