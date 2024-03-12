import { TestRun } from "@/graphql/types";

export function filterTestRun(
  testRun: TestRun,
  {
    status,
    text,
    branch,
  }: {
    status: string;
    text: string;
    branch: string;
  }
) {
  const lowerCaseText = text.toLowerCase();
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
