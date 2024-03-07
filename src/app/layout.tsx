import { configureGraphQLClient } from "@/graphql/graphQLClient";
import { getAccessToken, getSession, handleLogin } from "@auth0/nextjs-auth0";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import assert from "assert";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export const metadata = {
  title: "Replay",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <UserProvider>
        <Authenticated>
          <body>{children}</body>
        </Authenticated>
      </UserProvider>
    </html>
  );
}

async function Authenticated({ children }: PropsWithChildren) {
  const session = await getSession();
  if (session == null) {
    redirect("/api/auth/login");
    return null;
  }

  const { accessToken } = await getAccessToken();
  assert(accessToken, "accessToken is required");

  configureGraphQLClient(accessToken);

  return <>{children}</>;
}
