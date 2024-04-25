import assert from "node:assert/strict";
import { TestSuiteTest, TestSuiteTestExecutionSummary } from "@/graphql/types";
import { getUID } from "./getUID";
import { partialToTestSuiteTestRecording } from "./partialToTestSuiteTestRecording";

export function partialToTestSuiteTest({
  durationMs = 100,
  errors = null,
  id = getUID("test-id"),
  executions = [{}],
  scope = [],
  sourcePath = "path/to/source.ts",
  status = "passed",
  title = "Test title",
}: Partial<
  Omit<TestSuiteTest, "executions"> & { executions?: Partial<TestSuiteTestExecutionSummary>[] }
> = {}): TestSuiteTest {
  return {
    durationMs,
    errors,
    executions: executions.map((execution, index) => {
      let executionStatus = execution.status;
      if (index === 0) {
        assert(executionStatus !== "flaky");
        executionStatus ??= status;
      } else {
        assert(executionStatus !== "passed");
        executionStatus ??= "flaky";
      }
      return {
        status: executionStatus,
        recordings: (execution.recordings ?? [partialToTestSuiteTestRecording()]).map(
          partialToTestSuiteTestRecording
        ),
      };
    }),
    id,
    scope,
    sourcePath,
    status,
    title,
  };
}
