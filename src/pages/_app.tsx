import { SessionContextProvider } from "@/components/SessionContext";
import { HEADERS } from "@/constants";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import assert from "assert";
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
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

    assert("Layout" in Component, "Page.Layout is required");
    const Layout = Component.Layout as ComponentType<PropsWithChildren>;

    let children = (
      <SessionContextProvider accessToken={accessToken}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionContextProvider>
    );

    const isAuthenticated = !!accessToken;
    if (isAuthenticated) {
      children = <UserProvider>{children}</UserProvider>;
    }

    return (
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Head>
          <link rel="icon" href="/favicon.svg" />
        </Head>
        {children}
      </ErrorBoundary>
    );
  }
}

function ErrorFallback() {
  return (
    <section role="alert">
      <div className="flex flex-col gap-2 p-4 items-center">
        <h1 className="text-6xl font-bold text-red-500">We&apos;re sorry</h1>
        <p className="font-bold text-3xl text-white">Something went wrong.</p>
        <p className="text-lg font-light text-slate-400">
          While we look into it, try reloading the page.
        </p>
      </div>
    </section>
  );
}
