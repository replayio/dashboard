import assert from "assert";
import {
  TestRun,
  TestSuiteTest,
  TestSuiteTestStatus,
  WorkspaceSubscription,
} from "@/graphql/types";

export const TEAM_TYPE_OPTIONS = [
  { label: "Test Suite", value: "testsuite" as const },
  { label: "Standard", value: "standard" as const },
];

export const DEFAULT_TEAM_TYPE_OPTION = TEAM_TYPE_OPTIONS[0];

export function filterTest(
  test: TestSuiteTest,
  {
    status,
    text,
  }: {
    status: string;
    text: string;
  }
) {
  if (status === "failed") {
    if (test.status === "passed") {
      return false;
    }
  }

  if (text !== "") {
    const lowerCaseText = text.toLowerCase();

    if (
      !test.sourcePath.toLowerCase().includes(lowerCaseText) &&
      !test.title.toLowerCase().includes(lowerCaseText)
    ) {
      return false;
    }
  }

  return true;
}

export function filterTestRun(
  testRun: TestRun,
  {
    afterDate,
    branch,
    status,
    text,
  }: {
    afterDate: Date;
    branch: string;
    status: string;
    text: string;
  }
) {
  const startOfDay = new Date(testRun.date);
  startOfDay.setHours(0, 0, 0, 0);
  if (startOfDay < afterDate) {
    return false;
  }

  if (status === "failed") {
    if (testRun.numFailed === 0) {
      return false;
    }
  }

  const branchName = testRun.branchName ?? "";

  if (branch === "primary") {
    if (branchName !== "main" && branchName !== "master") {
      return false;
    }
  }

  if (text !== "") {
    const lowerCaseText = text.toLowerCase();

    const user = testRun.user ?? "";
    const title = getTestRunTitle(testRun);

    if (
      !branchName.toLowerCase().includes(lowerCaseText) &&
      !user.toLowerCase().includes(lowerCaseText) &&
      !title.toLowerCase().includes(lowerCaseText)
    ) {
      return false;
    }
  }

  return true;
}

export function getBackgroundColorClassName(status: TestSuiteTestStatus) {
  switch (status) {
    case "failed":
      return "bg-rose-500 text-white";
    case "flaky":
      return "bg-yellow-400 text-black";
    case "passed":
      return "bg-green-500 text-black";
  }
}

export function getColorClassName(status: TestSuiteTestStatus) {
  switch (status) {
    case "failed":
      return "text-rose-500";
    case "flaky":
      return "text-yellow-400";
    case "passed":
      return "text-green-500";
  }
}

export function getPlanKey({
  isOrg,
  isInternal,
  teamType,
}: {
  isOrg: boolean;
  isInternal?: boolean;
  teamType: "testsuite" | "standard";
}) {
  let planKey;
  if (isOrg) {
    planKey = "org-v1";
  } else if (teamType === "standard" && !isInternal) {
    planKey = "team-v1";
  } else if (teamType === "standard" && isInternal) {
    planKey = "team-internal-v1";
  } else if (teamType === "testsuite") {
    planKey = "testsuites-v1";
  }
  assert(planKey, "Invalid team type");
  return planKey;
}

export function isPlanBeta(subscription: WorkspaceSubscription) {
  return subscription.plan?.key === "testsuites-v1";
}

export function isPlanPricingPerSeat(subscription: WorkspaceSubscription) {
  return subscription.plan?.key !== "testsuites-v1";
}

export function getTestRunTitle(groupedTestCases: TestRun): string {
  const { commitTitle, groupLabel, prTitle } = groupedTestCases;
  if (groupLabel) {
    return groupLabel;
  } else if (commitTitle) {
    return commitTitle;
  } else if (prTitle) {
    return prTitle;
  }

  return "Test";
}
