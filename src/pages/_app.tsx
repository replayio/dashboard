import { ClientOnly } from "@/components/ClientOnly";
import { NavList } from "@/components/LeftNavigation/NavList";
import { SessionContextProvider } from "@/components/SessionContext";
import { authClientId, authDomain } from "@/config";
import { Auth0Provider } from "@auth0/auth0-react";
import { ErrorBoundary } from "react-error-boundary";

import "use-context-menu/styles.css";
import "../global.css";

export default function App({ Component, pageProps }: any) {
  return (
    <div className="flex h-screen w-screen flex-row bg-slate-900">
      <Auth0Provider
        domain={authDomain}
        clientId={authClientId}
        authorizationParams={{
          audience: "https://api.replay.io",
          code_challenge_method: "S256",
          redirect_uri: "http://localhost:8080/",
          response_type: "code",
          scope: "openid profile offline_access",
        }}
      >
        <SessionContextProvider>
          <ClientOnly>
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
                <Component {...pageProps} />
              </ErrorBoundary>
            </main>
          </ClientOnly>
        </SessionContextProvider>
      </Auth0Provider>
    </div>
  );
}
