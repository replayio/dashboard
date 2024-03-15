import { AuthContextProvider } from "@/components/AuthContext";
import { NavList } from "@/components/LeftNavigation/NavList";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { PropsWithChildren, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Icon } from "@/components/Icon";
import { redirect } from "next/navigation";
import "use-context-menu/styles.css";
import "./global.css";

export const metadata = {
  title: "Replay",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <UserProvider>
        <WithAuth>
          <body className="flex h-screen w-screen flex-row bg-slate-900">
            <NavList />
            <main className="flex flex-col grow overflow-auto">
              <ErrorBoundary
                fallback={
                  <div
                    className="bg-rose-400 text-rose-900 px-2 py-1 rounded m-2 font-bold inline-block"
                    role="alert"
                  >
                    Something went wrong =(
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="flex flex-row items-center gap-2 text-slate-500 p-4">
                      <Icon
                        className="w-6 h-6 animate-spin"
                        type="loading-spinner"
                      />
                      <div className="text-lg">Loading...</div>
                    </div>
                  }
                >
                  {children}
                </Suspense>
              </ErrorBoundary>
            </main>
          </body>
        </WithAuth>
      </UserProvider>
    </html>
  );
}

async function WithAuth({ children }: PropsWithChildren) {
  let accessToken: string | undefined;

  try {
    const result = await getAccessToken();
    accessToken = result.accessToken;
  } catch (error) {
    // ...
  }

  if (!accessToken) {
    redirect("/api/auth/login");
  }

  return (
    <AuthContextProvider accessToken={accessToken}>
      {children}
    </AuthContextProvider>
  );
}
