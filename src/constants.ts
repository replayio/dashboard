/** Intercom people custom attribute API names (dashboard intake). */
export const INTERCOM_CONTACT_ATTR = {
  userType: "user_type",
  vibeTool: "vibe_tool",
  companyName: "Company_name",
  source: "source",
} as const;

export const COOKIES = {
  accessToken: "replay:access-token",
  authReturnTo: "replay:auth-return-to",
  auth0ConnectAccount: "replay:auth0-connect-account",
  browserAuth: "replay:browser-auth",
  /** Set by Playwright via navigateToPage so CI e2e skips intake (no Intercom fixture for test users). */
  e2eSkipIntake: "replay:dashboard:e2e-skip-intake",
  defaultPathname: "replay:dashboard:default-pathname",
  intakeCompleted: "replay:dashboard:intake-completed",
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
  dispatch: process.env.NEXT_PUBLIC_DISPATCH_URL || "https://dispatch.replay.io",
};

export const TEST_USER_3 = {
  email: "frontende2e3@replay.io",
  password: process.env.TEST_USER_3_PASSWORD!,
};
