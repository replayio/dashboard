import { configureClient } from "@/graphql/client";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import assert from "assert";
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

// TODO Do I need to pass through access token to the protocl?
// "Authentication.setAccessToken"
async function Authenticated({ children }: PropsWithChildren) {
  const { accessToken } = await getAccessToken();
  assert(accessToken, "accessToken is required");

  configureClient(accessToken);

  return <>{children}</>;
}
