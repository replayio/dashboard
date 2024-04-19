import { expect, test } from "@playwright/test";
import { mockGetWorkspaceTestExecutions } from "tests/mocks/utils/mockGetWorkspaceTestExecutions";
import { mockGetWorkspaceTests } from "tests/mocks/utils/mockGetWorkspaceTests";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { MockData } from "./mocks/types";
import { getContextMenuItem } from "./utils/getContextMenuItem";
import { getTestSummaryRow } from "./utils/getTestSummaryRow";
import { navigateToPage } from "./utils/navigateToPage";
import { openContextMenu } from "./utils/openContextMenu";
import { submitInputText } from "./utils/submitInputText";

test("test-suites-tests-1: sorting and filtering test runs", async ({
  page,
}) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/tests`,
  });

  {
    // Sort: alphabetically
    await openContextMenu(page, "Tests-SortByFilter");
    await getContextMenuItem(page, "Sort alphabetically").click();

    const rows = getTestSummaryRow(page);
    await expect(rows).toHaveCount(4);
    await expect(await rows.nth(0).textContent()).toContain("1 failed test");
    await expect(await rows.nth(1).textContent()).toContain("1 passing test");
    await expect(await rows.nth(2).textContent()).toContain("2 flaky tests");
    await expect(await rows.nth(3).textContent()).toContain("No tests");
  }

  {
    // Sort: by failure rate
    await openContextMenu(page, "Tests-SortByFilter");
    await getContextMenuItem(page, "Sort by failure rate").click();

    const rows = getTestSummaryRow(page);
    await expect(rows).toHaveCount(4);
    await expect(await rows.nth(0).textContent()).toContain("1 failed test");
    await expect(await rows.nth(1).textContent()).toContain("No tests");
    await expect(await rows.nth(2).textContent()).toContain("1 passing test");
    await expect(await rows.nth(3).textContent()).toContain("2 flaky tests");
  }

  {
    // Sort: by flaky rate
    await openContextMenu(page, "Tests-SortByFilter");
    await getContextMenuItem(page, "Sort by flaky rate").click();

    const rows = getTestSummaryRow(page);
    await expect(rows).toHaveCount(4);
    await expect(await rows.nth(0).textContent()).toContain("2 flaky tests");
    await expect(await rows.nth(1).textContent()).toContain("1 failed test");
    await expect(await rows.nth(2).textContent()).toContain("No tests");
    await expect(await rows.nth(3).textContent()).toContain("1 passing test");
  }

  {
    // Text filtering

    const rows = getTestSummaryRow(page);

    await submitInputText(page, "Tests-TextFilter", "No");
    await expect(rows).toHaveCount(1);
    await expect(await rows.nth(0).textContent()).toContain("No tests");

    await submitInputText(page, "Tests-TextFilter", "flaky");
    await expect(rows).toHaveCount(2);
    await expect(await rows.nth(0).textContent()).toContain("2 flaky");
    await expect(await rows.nth(1).textContent()).toContain("3 flaky");
  }

  // Unfortunately we can't test the date filtering because this is done on the server
});

const mockGraphQLData: MockData = {
  GetWorkspaceTestExecutions: mockGetWorkspaceTestExecutions([]),
  GetWorkspaceTests: mockGetWorkspaceTests([
    {
      stats: {
        passed: 0,
      },
      title: "No tests or recordings",
    },
    {
      stats: {
        passed: 1,
      },
      title: "1 passing test",
    },
    {
      stats: {
        flaky: 2,
        flakyRate: 1,
      },
      title: "2 flaky tests",
    },
    {
      stats: {
        failed: 1,
        failureRate: 0.25,
        flaky: 3,
        flakyRate: 0.75,
        passed: 1,
      },
      title: "1 failed test, 3 flaky tests",
    },
  ]),
};
