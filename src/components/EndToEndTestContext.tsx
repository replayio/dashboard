import { PropsWithChildren, createContext, useMemo } from "react";
import { MockDataKey } from "../../tests/mocks/data";

export type EndToEndTestContextType = {
  mockKey: MockDataKey | null;
};

export const EndToEndTestContext = createContext<EndToEndTestContextType>(
  null as any
);

export function EndToEndTestContextProvider({
  children,
  mockKey,
}: PropsWithChildren<{ mockKey: string | null }>) {
  const value = useMemo<EndToEndTestContextType>(
    () => ({
      mockKey: mockKey as MockDataKey | null,
    }),
    [mockKey]
  );

  return (
    <EndToEndTestContext.Provider value={value}>
      {children}
    </EndToEndTestContext.Provider>
  );
}
