export const COOKIES = {
  accessToken: "replay:access-token",
  authReturnTo: "replay:auth-return-to",
  browserAuth: "replay:browser-auth",
  defaultPathname: "replay:dashboard:default-pathname",
  mobileWarningDismissed: "replay:dashboard:mobile-warning-dismissed",
  mockGraphQLData: "replay:mock-graphql-data",
  testRunsFilters: "replay:dashboard:test-runs-filters",
  testsFilters: "replay:dashboard:tests-filters",
};

export const HEADERS = {
  accessToken: "x-access-token",
  accessTokenSource: "x-access-token-source",
  mockGraphQLData: "x-mock-graphql-data",
  userAgent: "x-user-agent",
};

export const LOCAL_STORAGE = {};

export const URLS = {
  api: process.env.NEXT_PUBLIC_API_URL || "https://api.replay.io",
  app: process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.APP_URL!,
};
