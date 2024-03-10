import { AuthContextProvider } from "@/components/AuthContext";
import { NavList } from "@/components/LeftNavigation/NavList";
import { PanelClient } from "@/components/ResizablePanels/PanelClient";
import { PanelGroupClient } from "@/components/ResizablePanels/PanelGroupClient";
import { PanelResizeHandleClient } from "@/components/ResizablePanels/PanelResizeHandleClient";
import { getPanelGroupSavedLayout } from "@/components/ResizablePanels/getPanelGroupSavedLayout";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import assert from "assert";
import { PropsWithChildren, Suspense } from "react";

import "./global.css";
import "use-context-menu/styles.css";
import { redirect } from "next/navigation";
import { Icon } from "@/components/Icon";

export const metadata = {
  title: "Replay",
};

export default function RootLayout({ children }: PropsWithChildren) {
  const [defaultSizeLeft, defaultSizeRight] = getPanelGroupSavedLayout(
    "react-resizable-panel:layout"
  );

  return (
    <html lang="en">
      <UserProvider>
        <WithAuth>
          <body className="h-screen w-screen">
            <PanelGroupClient
              autoSaveId="react-resizable-panel:layout"
              className="flex h-screen w-screen flex-row bg-slate-900"
              direction="horizontal"
            >
              <PanelClient
                defaultSize={defaultSizeLeft ?? 25}
                minSize={15}
                maxSize={35}
              >
                <NavList />
              </PanelClient>
              <PanelResizeHandleClient />
              <PanelClient
                className="flex flex-col grow overflow-auto"
                defaultSize={defaultSizeRight ?? 75}
              >
                <Suspense
                  fallback={
                    <div className="flex flex-row items-center gap-2 text-slate-500 p-4">
                      <Icon
                        className="w-6 h-6 animate-spin "
                        type="loading-spinner"
                      />
                      <div className="text-lg">Loading...</div>
                    </div>
                  }
                >
                  {children}
                </Suspense>
              </PanelClient>
            </PanelGroupClient>
          </body>
        </WithAuth>
      </UserProvider>
    </html>
  );
}

async function WithAuth({ children }: PropsWithChildren) {
  let accessToken: string | undefined;

  try {
    accessToken = (await getAccessToken())?.accessToken;
  } catch (error) {}

  if (accessToken === undefined) {
    redirect("/api/auth/login");
  }

  return (
    <AuthContextProvider accessToken={accessToken}>
      {children}
    </AuthContextProvider>
  );
}
