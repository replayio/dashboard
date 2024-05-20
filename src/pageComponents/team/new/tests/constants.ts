import { Option } from "@/components/Select";

export type TestRunner = "cypress" | "jest" | "playwright";
export type TestRunnerOption = Option & {
  type: TestRunner;
};
const Cypress: TestRunnerOption = {
  label: "Cypress",
  type: "cypress",
};
const Jest: TestRunnerOption = {
  label: "Jest",
  type: "jest",
};
const Playwright: TestRunnerOption = {
  label: "Playwright",
  type: "playwright",
};
export const TEST_RUNNER_OPTIONS: TestRunnerOption[] = [Cypress, Jest, Playwright];

export type PackageManager = "npm" | "pnpm" | "yarn";
export type PackageManagerOption = Option & {
  type: PackageManager;
};
const NPM: PackageManagerOption = {
  label: "npm",
  type: "npm",
};
const PNPM: PackageManagerOption = {
  label: "PNPM",
  type: "pnpm",
};
const Yarn: PackageManagerOption = {
  label: "Yarn",
  type: "yarn",
};

export const PACKAGE_MANAGER_OPTIONS: PackageManagerOption[] = [NPM, PNPM, Yarn];
export const DEFAULT_PACKAGE_MANAGER_OPTION: PackageManagerOption = NPM;
