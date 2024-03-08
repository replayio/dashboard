"use client";

import { PropsWithChildren, createContext } from "react";

export const AuthContext = createContext<string | null>(null);

export function AuthContextProvider({
  accessToken,
  children,
}: PropsWithChildren<{ accessToken: string }>) {
  return (
    <AuthContext.Provider value={accessToken}>{children}</AuthContext.Provider>
  );
}
