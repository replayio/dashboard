import App from "next/app";
import { ClientOnly } from "@/components/ClientOnly";
import { NavList } from "@/components/LeftNavigation/NavList";
import { SessionContextProvider } from "@/components/SessionContext";
import { HEADERS } from "@/constants";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppContext, AppProps } from "next/app";
import { ErrorBoundary } from "react-error-boundary";
import "use-context-menu/styles.css";
import "../global.css";

export default class MyApp extends App<AppProps<{ accessToken: string }>> {
  accessToken: string;

  constructor(context: AppProps<{ accessToken: string }>) {
    super(context);

    this.accessToken = context.pageProps.accessToken;
  }

  static getInitialProps = async (context: AppContext) => {
    const accessToken = context.ctx.req?.headers?.[HEADERS.accessToken];

    return { pageProps: { accessToken } };
  };

  render() {
    const { Component, pageProps } = this.props;

    const accessToken = this.accessToken;

    return (
      <div className="flex h-screen w-screen flex-row bg-slate-900">
        <UserProvider>
          <ClientOnly>
            <SessionContextProvider accessToken={accessToken}>
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
            </SessionContextProvider>
          </ClientOnly>
        </UserProvider>
      </div>
    );
  }
}
