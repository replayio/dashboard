import { TestRun, TestSuiteTest } from "@/graphql/types";

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

    if (!test.title.toLowerCase().includes(lowerCaseText)) {
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
    // TODO This should be configurable by Workspace
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

export function getTestRunTitle(groupedTestCases: TestRun): string {
  const { commitTitle, prTitle } = groupedTestCases;
  if (commitTitle) {
    return commitTitle;
  } else if (prTitle) {
    return prTitle;
  }

  return "Test";
}
