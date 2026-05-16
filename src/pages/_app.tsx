import { ApolloContextProvider } from "@/components/ApolloContext";
import { initializeMixPanel } from "@/utils/mixpanel";
import { EmptyLayout } from "@/components/EmptyLayout";
import { EndToEndTestContextProvider } from "@/components/EndToEndTestContext";
import { IntercomMessenger } from "@/components/IntercomMessenger";
import { SessionContextProvider } from "@/components/SessionContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/components/SidebarContext";
import { WebMcpRegistration } from "@/components/WebMcpRegistration";
import { UserSettingsProvider } from "@/pageComponents/user/settings/UserSettingsContext";
import { COOKIES, HEADERS } from "@/constants";
import { getCurrentUser } from "@/graphql/queries/getCurrentUser";
import { User } from "@/graphql/types";
import { captureAdAttribution } from "@/utils/adAttribution";
import { decompress } from "@/utils/compression";
import {
  AccessTokenCookie,
  deleteCookieValueClient,
  isSecureEnvironment,
  setCookieValueClient,
} from "@/utils/cookie";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import { listenForAccessToken } from "@/utils/replayBrowser";
import cookie from "cookie";
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { ComponentType, PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MockGraphQLData } from "@/testing/mockGraphQLTypes";
import "@xterm/xterm/css/xterm.css";
import "use-context-menu/styles.css";
import "../global.css";
import "../shiki.css";

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
    let accessToken = getValueFromArrayOrString(context.ctx.req?.headers?.[HEADERS.accessToken]);
    const accessTokenSource = getValueFromArrayOrString(
      context.ctx.req?.headers?.[HEADERS.accessTokenSource]
    );
    const mockGraphQLDataString = getValueFromArrayOrString(
      context.ctx.req?.headers?.[HEADERS.mockGraphQLData]
    );
    const mockGraphQLData = mockGraphQLDataString
      ? decompress<MockGraphQLData>(mockGraphQLDataString)
      : null;

    let user = null;
    if (accessToken) {
      try {
        user = await getCurrentUser(accessToken, mockGraphQLData);
      } catch (error) {
        clearAccessTokenCookie(context);
        redirectProtectedRouteToLogin(context);
        accessToken = "";
        if (process.env.NODE_ENV !== "production") {
          const message = error instanceof Error ? error.message : String(error);
          console.warn("Failed to fetch current user; clearing session", message);
        }
      }
    }

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
    initializeMixPanel();

    // belt-and-suspenders: landing-page captures on replay.io first-touch,
    // but users who land directly on app.replay.io (bookmark, direct ad
    // URL) still need attribution captured here.
    captureAdAttribution();
  }

  render() {
    const { accessToken, mockGraphQLData, props, user } = this;
    const { Component, pageProps } = props;

    let Layout: ComponentType<PropsWithChildren> = EmptyLayout;
    if ("Layout" in Component) {
      Layout = Component.Layout as ComponentType<PropsWithChildren>;
    }

    let children = (
      <ThemeProvider>
        <EndToEndTestContextProvider mockGraphQLData={mockGraphQLData}>
          <SessionContextProvider accessToken={accessToken} user={user}>
            <ApolloContextProvider>
              <SidebarProvider>
                <UserSettingsProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </UserSettingsProvider>
              </SidebarProvider>
            </ApolloContextProvider>
            <IntercomMessenger />
          </SessionContextProvider>
        </EndToEndTestContextProvider>
      </ThemeProvider>
    );

    return (
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Head>
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <WebMcpRegistration />
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
        <p className="font-bold text-3xl text-foreground">Something went wrong.</p>
        <p className="text-lg font-light text-muted-foreground">
          While we look into it, try reloading the page.
        </p>
      </div>
    </section>
  );
}

function clearAccessTokenCookie(context: AppContext) {
  const res = context.ctx.res;
  if (res) {
    const serialized = cookie.serialize(COOKIES.accessToken, "", {
      maxAge: 0,
      path: "/",
      sameSite: "lax",
      secure: isSecureEnvironment(),
    });
    const current = res.getHeader("Set-Cookie");
    if (!current) {
      res.setHeader("Set-Cookie", serialized);
    } else if (Array.isArray(current)) {
      res.setHeader("Set-Cookie", [...current, serialized]);
    } else {
      res.setHeader("Set-Cookie", [String(current), serialized]);
    }
  } else if (typeof window !== "undefined") {
    deleteCookieValueClient(COOKIES.accessToken);
  }
}

function redirectProtectedRouteToLogin(context: AppContext) {
  const pathname = context.ctx.asPath ?? context.ctx.pathname ?? "/";
  if (!isProtectedPathname(pathname)) {
    return;
  }

  const loginPath = `/login?${new URLSearchParams({ returnTo: pathname })}`;
  if (context.ctx.res && !context.ctx.res.headersSent) {
    context.ctx.res.writeHead(307, { Location: loginPath });
    context.ctx.res.end();
  } else if (typeof window !== "undefined") {
    window.location.replace(loginPath);
  }
}

function isProtectedPathname(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/home" ||
    pathname === "/intake" ||
    pathname.startsWith("/github.com") ||
    pathname.startsWith("/org") ||
    pathname.startsWith("/team") ||
    pathname.startsWith("/user")
  );
}
