import { decompress } from "@/utils/compression";
import { PropsWithChildren, createContext, useMemo } from "react";
import { MockGraphQLData } from "../../tests/mocks/types";

export type EndToEndTestContextType = {
  mockGraphQLData: MockGraphQLData | null;
};

export const EndToEndTestContext = createContext<EndToEndTestContextType>(null as any);

export function EndToEndTestContextProvider({
  children,
  mockGraphQLData: mockGraphQLDataString,
}: PropsWithChildren<{ mockGraphQLData: string | null }>) {
  const value = useMemo<EndToEndTestContextType>(
    () => ({
      mockGraphQLData: mockGraphQLDataString
        ? decompress<MockGraphQLData>(mockGraphQLDataString)
        : null,
    }),
    [mockGraphQLDataString]
  );

  return <EndToEndTestContext.Provider value={value}>{children}</EndToEndTestContext.Provider>;
}
