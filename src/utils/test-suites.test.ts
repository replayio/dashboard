import { describe, it, expect } from "@jest/globals";
import {
  filterTest,
  filterTestRun,
  getBackgroundColorClassName,
  getColorClassName,
  getPlanKey,
  isPlanBeta,
  isPlanPricingPerSeat,
  getTestRunTitle,
} from "@/utils/test-suites";
import { TestRun, TestSuiteTest, WorkspaceSubscription } from "@/graphql/types";

function makeTest(overrides: Partial<TestSuiteTest> = {}): TestSuiteTest {
  return {
    durationMs: 1000,
    errors: null,
    executions: [],
    id: "t1",
    scope: [],
    sourcePath: "test.spec.ts",
    status: "passed",
    title: "my test",
    ...overrides,
  };
}

function makeTestRun(overrides: Partial<TestRun> = {}): TestRun {
  return {
    branchName: "main",
    commitId: "abc",
    commitTitle: "fix: stuff",
    date: new Date("2024-06-15"),
    groupLabel: null,
    id: "r1",
    isPrimaryBranch: true,
    numFailed: 0,
    numFlaky: 0,
    numPassed: 5,
    prNumber: null,
    prTitle: null,
    repository: null,
    triggerUrl: null,
    user: "alice",
    ...overrides,
  };
}

describe("filterTest", () => {
  it("should include all tests with default filters", () => {
    expect(filterTest(makeTest(), { status: "all", text: "" })).toBe(true);
  });

  it("should exclude passed tests when filtering for failed", () => {
    expect(filterTest(makeTest({ status: "passed" }), { status: "failed", text: "" })).toBe(false);
  });

  it("should include failed tests when filtering for failed", () => {
    expect(filterTest(makeTest({ status: "failed" }), { status: "failed", text: "" })).toBe(true);
  });

  it("should include flaky tests when filtering for failed", () => {
    expect(filterTest(makeTest({ status: "flaky" }), { status: "failed", text: "" })).toBe(true);
  });

  it("should filter by title text (case insensitive)", () => {
    expect(filterTest(makeTest({ title: "Login Flow" }), { status: "all", text: "login" })).toBe(
      true
    );
    expect(filterTest(makeTest({ title: "Login Flow" }), { status: "all", text: "signup" })).toBe(
      false
    );
  });
});

describe("filterTestRun", () => {
  const defaultFilters = {
    afterDate: new Date("2024-01-01"),
    branch: "all",
    status: "all",
    text: "",
  };

  it("should include runs within the date range", () => {
    expect(filterTestRun(makeTestRun({ date: new Date("2024-06-15") }), defaultFilters)).toBe(true);
  });

  it("should exclude runs before the date range", () => {
    expect(filterTestRun(makeTestRun({ date: new Date("2023-12-31") }), defaultFilters)).toBe(
      false
    );
  });

  it("should filter by failed status", () => {
    expect(
      filterTestRun(makeTestRun({ numFailed: 0 }), { ...defaultFilters, status: "failed" })
    ).toBe(false);
    expect(
      filterTestRun(makeTestRun({ numFailed: 3 }), { ...defaultFilters, status: "failed" })
    ).toBe(true);
  });

  it("should filter primary branches (main/master)", () => {
    expect(
      filterTestRun(makeTestRun({ branchName: "main" }), { ...defaultFilters, branch: "primary" })
    ).toBe(true);
    expect(
      filterTestRun(makeTestRun({ branchName: "master" }), {
        ...defaultFilters,
        branch: "primary",
      })
    ).toBe(true);
    expect(
      filterTestRun(makeTestRun({ branchName: "feature-x" }), {
        ...defaultFilters,
        branch: "primary",
      })
    ).toBe(false);
  });

  it("should filter by text across branch, user, and title", () => {
    expect(
      filterTestRun(makeTestRun({ user: "alice" }), { ...defaultFilters, text: "alice" })
    ).toBe(true);
    expect(
      filterTestRun(makeTestRun({ branchName: "feat/login" }), {
        ...defaultFilters,
        text: "login",
      })
    ).toBe(true);
    expect(filterTestRun(makeTestRun(), { ...defaultFilters, text: "zzz-no-match" })).toBe(false);
  });
});

describe("getBackgroundColorClassName / getColorClassName", () => {
  it("should return correct classes for each status", () => {
    expect(getBackgroundColorClassName("failed")).toContain("rose");
    expect(getBackgroundColorClassName("flaky")).toContain("yellow");
    expect(getBackgroundColorClassName("passed")).toContain("green");

    expect(getColorClassName("failed")).toContain("rose");
    expect(getColorClassName("flaky")).toContain("yellow");
    expect(getColorClassName("passed")).toContain("green");
  });
});

describe("getPlanKey", () => {
  it("should return org-v1 for organizations", () => {
    expect(getPlanKey({ isOrg: true, teamType: "standard" })).toBe("org-v1");
  });

  it("should return team-v1 for standard non-internal teams", () => {
    expect(getPlanKey({ isOrg: false, teamType: "standard" })).toBe("team-v1");
  });

  it("should return team-internal-v1 for internal teams", () => {
    expect(getPlanKey({ isOrg: false, isInternal: true, teamType: "standard" })).toBe(
      "team-internal-v1"
    );
  });

  it("should return testsuites-v1 for test suite teams", () => {
    expect(getPlanKey({ isOrg: false, teamType: "testsuite" })).toBe("testsuites-v1");
  });
});

describe("isPlanBeta / isPlanPricingPerSeat", () => {
  const sub = (key: string) => ({ plan: { key } }) as unknown as WorkspaceSubscription;

  it("should identify beta plans", () => {
    expect(isPlanBeta(sub("testsuites-v1"))).toBe(true);
    expect(isPlanBeta(sub("team-v1"))).toBe(false);
  });

  it("should identify per-seat pricing", () => {
    expect(isPlanPricingPerSeat(sub("team-v1"))).toBe(true);
    expect(isPlanPricingPerSeat(sub("testsuites-v1"))).toBe(false);
  });
});

describe("getTestRunTitle", () => {
  it("should prefer commitTitle", () => {
    expect(
      getTestRunTitle(makeTestRun({ commitTitle: "fix: bug", prTitle: "PR #1", groupLabel: "G" }))
    ).toBe("fix: bug");
  });

  it("should fall back to prTitle", () => {
    expect(
      getTestRunTitle(makeTestRun({ commitTitle: null, prTitle: "PR #1", groupLabel: "G" }))
    ).toBe("PR #1");
  });

  it("should fall back to groupLabel", () => {
    expect(
      getTestRunTitle(makeTestRun({ commitTitle: null, prTitle: null, groupLabel: "Nightly" }))
    ).toBe("Nightly");
  });

  it("should fall back to 'Test'", () => {
    expect(
      getTestRunTitle(makeTestRun({ commitTitle: null, prTitle: null, groupLabel: null }))
    ).toBe("Test");
  });
});
