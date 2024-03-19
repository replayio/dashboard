import { ClientOnly } from "@/components/ClientOnly";
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout";
import { SessionContextProvider } from "@/components/SessionContext";
import { HEADERS } from "@/constants";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import App, { AppContext, AppProps } from "next/app";
import { ComponentType, PropsWithChildren } from "react";
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

    const Layout =
      "Layout" in Component
        ? (Component.Layout as ComponentType<PropsWithChildren>)
        : DefaultLayout;

    return (
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
        <UserProvider>
          <ClientOnly>
            <SessionContextProvider accessToken={accessToken}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SessionContextProvider>
          </ClientOnly>
        </UserProvider>
      </ErrorBoundary>
    );
  }
}
