import { Recording } from "@/graphql/generated/graphql";

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

  return target === "chromium"
    ? `https://app.replay.io/recording/${id}`
    : `https://legacy.replay.io/recording/${id}`;
}
