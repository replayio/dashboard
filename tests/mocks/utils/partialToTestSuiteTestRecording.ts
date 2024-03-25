import { TestSuiteTestRecording } from "@/graphql/types";
import { getRelativeDate } from "@/utils/date";

export function partialToTestSuiteTestRecording({
  buildId = "linux-chromium-20231223-9a98fcbda70c-953b4844d9c5",
  createdAt = getRelativeDate({ hoursAgo: 1 }),
  duration = 0,
  id = "fake-test-id-1",
  isProcessed = true,
  numComments = 0,
}: Partial<TestSuiteTestRecording> = {}): TestSuiteTestRecording {
  return {
    buildId,
    createdAt,
    duration,
    id,
    isProcessed,
    numComments,
  };
}
