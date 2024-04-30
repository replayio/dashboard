import { getRelativeDate } from "@/utils/date";

export const DATE_RANGE_FILTERS = {
  hour: "Past hour",
  day: "Past day",
  week: "Past week",
  biweekly: "Past 2 weeks",
  month: "Past month",
};
export const DEFAULT_DATE_RANGE_FILTER = "week";
export type DateRange = keyof typeof DATE_RANGE_FILTERS;

export function getDateForDateRange(dateRange: DateRange): Date {
  switch (dateRange) {
    case "biweekly":
      return getRelativeDate({ daysAgo: 14 });
    case "day":
      return getRelativeDate({ daysAgo: 1 });
    case "hour":
      return getRelativeDate({ hoursAgo: 1 });
    case "month":
      return getRelativeDate({ daysAgo: 30 });
    case "week":
    default:
      return getRelativeDate({ daysAgo: 7 });
  }
}
