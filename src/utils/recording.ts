import { TestSuiteTestStatus } from "@/graphql/types";

export enum RecordingTarget {
  gecko = "gecko",
  chromium = "chromium",
  node = "node",
  unknown = "unknown",
}

export function buildDateStringToDate(buildDate: string) {
  const y = buildDate.substring(0, 4);
  const m = buildDate.substring(4, 6);
  const d = buildDate.substring(6);

  return new Date(`${y}-${m}-${d}T00:00:00Z`);
}

export function getRecordingTarget(buildId: string): RecordingTarget {
  if (buildId.includes("gecko")) {
    return RecordingTarget.gecko;
  }
  if (buildId.includes("chromium")) {
    return RecordingTarget.chromium;
  }
  if (buildId.includes("node")) {
    return RecordingTarget.node;
  }
  return RecordingTarget.unknown;
}

export function getURL(id: string, buildId: string) {
  const target = getRecordingTarget(buildId);

  return target !== RecordingTarget.gecko ? `/recording/${id}` : `https://legacy.replay.io/recording/${id}`;
}

export function getExecutionStatus(
  execution: { result: string /*TestSuiteTestAttemptResult*/ },
  executions: { result: string /*TestSuiteTestAttemptResult*/ }[]
): TestSuiteTestStatus {
  switch (execution.result) {
    case "flaky": {
      if (executions.length === 1) {
        // Cypress tests are recorded on a single recordings since the app under test is in an iframe there
        // it means that the final successful is on the same recording as the flakes before it
        return "flaky";
      } else {
        // recordings come sorted, the newest one (the last one) is first
        // this recording should be displayed as passed since it's the final successful one
        // the previous ones (latter ones in the array) are flaky
        return executions[0] === execution ? "passed" : "flaky";
      }
    }
    case "passed": {
      return "passed";
    }
    default: {
      // TODO: handle unknown, skipped, timedOut
      return "failed";
    }
  }
}
