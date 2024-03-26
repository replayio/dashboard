import { TestSuiteTestExecutionRecording } from "@/graphql/types";
import { getRelativeDate } from "@/utils/date";
import { getUID } from "./getUID";

export function partialToTestSuiteTestExecutionRecording({
  buildId = "linux-chromium-20231223-9a98fcbda70c-953b4844d9c5",
  createdAt = getRelativeDate({ minutesAgo: 1 }),
  duration = 0,
  id = getUID("recording"),
  isProcessed = false,
  title = "Recording title",
}: Partial<TestSuiteTestExecutionRecording> = {}): TestSuiteTestExecutionRecording {
  return {
    buildId,
    createdAt,
    duration,
    id,
    isProcessed,
    title,
    uuid: id,
  };
}
