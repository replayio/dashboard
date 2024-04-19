import { PropsWithChildren, createContext, useMemo } from "react";
import { MockGraphQLQueries } from "../../tests/mocks/data";

export type EndToEndTestContextType = {
  mockGraphQLData: MockGraphQLQueries | null;
};

export const EndToEndTestContext = createContext<EndToEndTestContextType>(
  null as any
);

export function EndToEndTestContextProvider({
  children,
  mockGraphQLData,
}: PropsWithChildren<{ mockGraphQLData: string | null }>) {
  const value = useMemo<EndToEndTestContextType>(
    () => ({
      mockGraphQLData: mockGraphQLData
        ? (JSON.parse(mockGraphQLData) as MockGraphQLQueries)
        : null,
    }),
    [mockGraphQLData]
  );

  return (
    <EndToEndTestContext.Provider value={value}>
      {children}
    </EndToEndTestContext.Provider>
  );
}
