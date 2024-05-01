export const SORT_BY_FILTERS = {
  alphabetically: "Sort alphabetically",
  "failure-rate": "Sort by failure rate",
  "flaky-rate": "Sort by flaky rate",
};
export const DEFAULT_SORT_BY_FILTER = "failure-rate";
export type SortBy = keyof typeof SORT_BY_FILTERS;
