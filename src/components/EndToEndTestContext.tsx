import { PropsWithChildren, createContext, useMemo } from "react";
import { MockGraphQLData } from "../../tests/mocks/types";

export type EndToEndTestContextType = {
  mockGraphQLData: MockGraphQLData | null;
};

export const EndToEndTestContext = createContext<EndToEndTestContextType>(null as any);

export function EndToEndTestContextProvider({
  children,
  mockGraphQLData,
}: PropsWithChildren<{ mockGraphQLData: string | null }>) {
  const value = useMemo<EndToEndTestContextType>(
    () => ({
      mockGraphQLData: mockGraphQLData ? (JSON.parse(mockGraphQLData) as MockGraphQLData) : null,
    }),
    [mockGraphQLData]
  );

  return <EndToEndTestContext.Provider value={value}>{children}</EndToEndTestContext.Provider>;
}
