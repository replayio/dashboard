import { EnvironmentContextProvider } from "@/components/EnvironmentContext";
import { SessionContextProvider } from "@/components/SessionContext";
import { COOKIES, HEADERS } from "@/constants";
import { setCookieValueClient } from "@/utils/cookie";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import assert from "assert";
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { ComponentType, PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "use-context-menu/styles.css";
import "../global.css";

type PageProps = {
  accessToken: string;
  accessTokenSource: string;
  devtoolsUrl: string;
  mockKey: string;
};

export default class MyApp extends App<AppProps<PageProps>> {
  accessToken: string;
  accessTokenSource: string;
  environment: {
    devtoolsUrl: string;
    mockKey: string;
  };

  constructor(context: AppProps<PageProps>) {
    super(context);

    this.accessToken = context.pageProps.accessToken;
    this.accessTokenSource = context.pageProps.accessTokenSource;
    this.environment = {
      devtoolsUrl: context.pageProps.devtoolsUrl,
      mockKey: context.pageProps.mockKey,
    };
  }

  static getInitialProps = async (context: AppContext) => {
    const accessToken = context.ctx.req?.headers?.[HEADERS.accessToken];
    const accessTokenSource =
      context.ctx.req?.headers?.[HEADERS.accessTokenSource];
    const devtoolsUrl = context.ctx.req?.headers?.[HEADERS.devtoolsUrl];
    const mockKey = context.ctx.req?.headers?.[HEADERS.mockKey];

    return {
      pageProps: {
        accessToken,
        accessTokenSource,
        devtoolsUrl: devtoolsUrl || "",
        mockKey: mockKey || "",
      },
    };
  };

  componentDidMount(): void {
    const { accessToken, accessTokenSource } = this.props.pageProps;
    if (accessToken && accessTokenSource === "query") {
      // Store API key in a cookie to better support e2e tests and Support
      // The alternative is to pass the API key as a URL param
      setCookieValueClient(COOKIES.accessToken, accessToken);
    }
  }

  render() {
    const { accessToken, environment, props } = this;
    const { Component, pageProps } = props;

    assert("Layout" in Component, "Page.Layout is required");
    const Layout = Component.Layout as ComponentType<PropsWithChildren>;

    let children = (
      <EnvironmentContextProvider {...environment}>
        <SessionContextProvider accessToken={accessToken}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionContextProvider>
      </EnvironmentContextProvider>
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
