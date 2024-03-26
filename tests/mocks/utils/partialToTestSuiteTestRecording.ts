import { TestSuiteTestRecording } from "@/graphql/types";
import { getRelativeDate } from "@/utils/date";
import { getUID } from "./getUID";

export function partialToTestSuiteTestRecording({
  buildId = "linux-chromium-20231223-9a98fcbda70c-953b4844d9c5",
  createdAt = getRelativeDate({ minutesAgo: 1 }),
  duration = 0,
  id = getUID("recording"),
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
