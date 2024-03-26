import { TestSuiteTest } from "@/graphql/types";
import { getUID } from "./getUID";
import { partialToTestSuiteTestRecording } from "./partialToTestSuiteTestRecording";

export function partialToTestSuiteTest({
  durationMs = 100,
  errors = null,
  id = getUID("test-id"),
  recordings = [partialToTestSuiteTestRecording()],
  scope = [],
  sourcePath = "path/to/source.ts",
  status = "passed",
  title = "Test title",
}: Partial<TestSuiteTest> = {}): TestSuiteTest {
  return {
    durationMs,
    errors,
    id,
    recordings,
    scope,
    sourcePath,
    status,
    title,
  };
}
