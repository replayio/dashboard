import { User } from "@/graphql/types";
import { PropsWithChildren, createContext, useMemo } from "react";

export type SessionContextType = {
  accessToken: string;
  user: User;
};

export const SessionContext = createContext<SessionContextType>(null as any);

export function SessionContextProvider({
  accessToken,
  children,
  user,
}: PropsWithChildren & {
  accessToken: string;
  user: User;
}) {
  const value = useMemo(() => ({ accessToken, user }), [accessToken, user]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
