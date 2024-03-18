export const SORT_BY_FILTERS = {
  alphabetically: "Sort alphabetically",
  "failure-rate": "Sort by failure rate",
  "flaky-rate": "Sort by flaky rate",
};
export const DEFAULT_SORT_BY_FILTER = "failure-rate";
export type SortBy = keyof typeof SORT_BY_FILTERS;

export const DATE_RANGE_FILTERS = {
  day: "Last day",
  hour: "Last hour",
  week: "Last 7 days",
};
export const DEFAULT_DATE_RANGE_FILTER = "week";
export type DateRange = keyof typeof DATE_RANGE_FILTERS;
