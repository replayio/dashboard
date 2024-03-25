import { test } from "@playwright/test";
import { navigateToPage } from "./utils/navigateToPage";

test("test-suites-runs-01: passed run in main branch with source", async ({
  page,
}) => {
  await navigateToPage({
    mockKey: "SUCCESS_IN_MAIN_WITH_SOURCE",
    page,
    pathname: "/team/dzowNDAyOGMwYS05ZjM1LTQ2ZjktYTkwYi1jNzJkMTIzNzUxOTI=/runs",
  });

  // TODO
});
