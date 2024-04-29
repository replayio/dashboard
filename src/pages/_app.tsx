import { EndToEndTestContextProvider } from "@/components/EndToEndTestContext";
import { SessionContextProvider } from "@/components/SessionContext";
import { COOKIES, HEADERS } from "@/constants";
import { getCurrentUser } from "@/graphql/queries/getCurrentUser";
import { User } from "@/graphql/types";
import { decompress } from "@/utils/compression";
import { AccessTokenCookie, setCookieValueClient } from "@/utils/cookie";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import { listenForAccessToken } from "@/utils/replayBrowser";
import assert from "assert";
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { ComponentType, PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MockGraphQLData } from "tests/mocks/types";
import "use-context-menu/styles.css";
import "../global.css";

type PageProps = {
  accessToken: string;
  accessTokenSource: string;
  mockGraphQLData: string;
  user: User;
};

export default class MyApp extends App<AppProps<PageProps>> {
  accessToken: string;
  accessTokenSource: string;
  mockGraphQLData: string;
  user: User;

  constructor(context: AppProps<PageProps>) {
    super(context);

    this.accessToken = context.pageProps.accessToken;
    this.accessTokenSource = context.pageProps.accessTokenSource;
    this.mockGraphQLData = context.pageProps.mockGraphQLData;
    this.user = context.pageProps.user;
  }

  static getInitialProps = async (context: AppContext) => {
    const accessToken = getValueFromArrayOrString(context.ctx.req?.headers?.[HEADERS.accessToken]);
    const accessTokenSource = getValueFromArrayOrString(
      context.ctx.req?.headers?.[HEADERS.accessTokenSource]
    );
    const mockGraphQLDataString = getValueFromArrayOrString(
      context.ctx.req?.headers?.[HEADERS.mockGraphQLData]
    );
    const mockGraphQLData = mockGraphQLDataString
      ? decompress<MockGraphQLData>(mockGraphQLDataString)
      : null;

    const user = accessToken ? await getCurrentUser(accessToken, mockGraphQLData) : null;

    return {
      pageProps: {
        accessToken,
        accessTokenSource,
        mockGraphQLData: mockGraphQLDataString || "",
        user,
      },
    };
  };

  componentDidMount(): void {
    if (global.__IS_RECORD_REPLAY_RUNTIME__ && !this.accessToken) {
      listenForAccessToken(token => {
        setCookieValueClient(COOKIES.accessToken, {
          token,
          source: "external",
        } satisfies AccessTokenCookie);
        window.location.reload();
      });
    }
  }

  render() {
    const { accessToken, mockGraphQLData, props, user } = this;
    const { Component, pageProps } = props;

    assert("Layout" in Component, "Page.Layout is required");
    const Layout = Component.Layout as ComponentType<PropsWithChildren>;

    let children = (
      <EndToEndTestContextProvider mockGraphQLData={mockGraphQLData}>
        <SessionContextProvider accessToken={accessToken} user={user}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionContextProvider>
      </EndToEndTestContextProvider>
    );

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
