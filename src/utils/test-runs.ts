import { TestRun } from "@/graphql/types";

export function getTestRunTitle(groupedTestCases: TestRun): string {
  const { commitTitle, prTitle } = groupedTestCases;
  if (commitTitle) {
    return commitTitle;
  } else if (prTitle) {
    return prTitle;
  }

  return "Test";
}
