import { getRelativeDate } from "@/utils/date";

export function isDateWithinRetentionLimits(
  date: Date,
  retentionLimitDays: number | null
): boolean {
  if (retentionLimitDays == null) {
    return true;
  }

  const minTime = getRelativeDate({ daysAgo: retentionLimitDays }).getTime();
  const time = date.getTime();

  return time >= minTime;
}
