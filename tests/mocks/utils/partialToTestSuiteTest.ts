import { TestSuiteTest } from "@/graphql/types";
import { partialToTestSuiteTestRecording } from "./partialToTestSuiteTestRecording";
import { RECORDING_ID_1 } from "../constants";

export function partialToTestSuiteTest({
  durationMs = 100,
  errors = null,
  id = "fake-test-id",
  recordings = [partialToTestSuiteTestRecording({ id: RECORDING_ID_1 })],
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
