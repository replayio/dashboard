import { LeftNavigation } from "@/components/LeftNavigation";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { PropsWithChildren } from "react";
import "./global.css";
import { AuthContextProvider } from "@/components/AuthContext";
import { getAccessToken } from "@auth0/nextjs-auth0";
import assert from "assert";

export const metadata = {
  title: "Replay",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <UserProvider>
        <WithAuth>
          <body className="flex h-screen w-screen flex-row bg-slate-900">
            <LeftNavigation />
            <main className="flex flex-col grow overflow-auto">{children}</main>
          </body>
        </WithAuth>
      </UserProvider>
    </html>
  );
}

async function WithAuth({ children }: PropsWithChildren) {
  const { accessToken } = await getAccessToken();
  assert(accessToken, "accessToken is required");

  return (
    <AuthContextProvider accessToken={accessToken}>
      {children}
    </AuthContextProvider>
  );
}
