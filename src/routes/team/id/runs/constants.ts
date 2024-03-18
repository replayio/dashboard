export const BRANCH_FILTERS = {
  all: "All branches",
  primary: "Only primary branch",
};
export const DEFAULT_BRANCH_FILTER = "all";
export type Branch = keyof typeof BRANCH_FILTERS;

export const RUN_STATUS_FILTERS = {
  all: "All runs",
  failed: "Only failures",
};
export const DEFAULT_RUN_STATUS_FILTER = "all";
export type RunStatus = keyof typeof RUN_STATUS_FILTERS;

export const TEST_STATUS = {
  all: "All runs",
  failed: "Failed and flaky",
};
export const DEFAULT_TEST_STATUS_FILTER = "all";
export type TestStatus = keyof typeof TEST_STATUS;
