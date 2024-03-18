export const COOKIES = {
  defaultPathname: "replay:dashboard:default-pathname",
};

export const HEADERS = {
  accessToken: "x-access-token",
};

export const LOCAL_STORAGE = {
  testFilters: "replay:dashboard:tests-filters",
  testRunsFilters: "replay:dashboard:test-runs-filters",
};

export const HOST =
  process.env.NEXT_PUBLIC_APP_URL ??
  `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export const AUTH_REDIRECT_URI = HOST;
