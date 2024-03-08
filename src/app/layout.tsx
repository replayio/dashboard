import { AuthContextProvider } from "@/components/AuthContext";
import { LeftNavigation } from "@/components/LeftNavigation";
import { PanelClient } from "@/components/panels/PanelClient";
import { PanelGroupClient } from "@/components/panels/PanelGroupClient";
import { PanelResizeHandleClient } from "@/components/panels/PanelResizeHandleClient";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import assert from "assert";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";
import "./global.css";
import { getPanelGroupSavedLayout } from "@/components/panels/getPanelGroupSavedLayout";

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
                <LeftNavigation />
              </PanelClient>
              <PanelResizeHandleClient />
              <PanelClient
                className="flex flex-col grow overflow-auto"
                defaultSize={defaultSizeRight ?? 75}
              >
                {children}
              </PanelClient>
            </PanelGroupClient>
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
