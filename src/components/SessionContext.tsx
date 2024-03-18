import { PropsWithChildren, createContext, useMemo } from "react";

export type SessionContextType = {
  accessToken: string;
};

export const SessionContext = createContext<SessionContextType>(null as any);

export function SessionContextProvider({
  accessToken,
  children,
}: PropsWithChildren & {
  accessToken: string;
}) {
  const value = useMemo(() => ({ accessToken }), [accessToken]);

  return (
    <SessionContext.Provider value={value}>
      {accessToken == null ? null : children}
    </SessionContext.Provider>
  );
}
