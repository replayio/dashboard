import { TestRunStatsData } from "@/pageComponents/team/id/runs/TestRunStatsGraph";
import { getTestRunStatsTooltip } from "@/pageComponents/team/id/runs/getTestRunStatsTooltip";
import { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

function createChartDataType(data: Partial<TestRunStatsData>) {
  return {
    date: new Date("2000-01-01"),
    numFailedTestRuns: 0,
    numPassingTestRuns: 0,
    numFailedTests: 0,
    numPassingTests: 0,
    ...data,
  };
}

function expectToContainText(tooltip: ReactNode, ...expectedTexts: string[]) {
  const container = document.createElement("div");

  act(() => {
    const root = createRoot(container);
    root.render(tooltip);
  });

  expectedTexts.forEach((expectedText) => {
    expect(container.textContent).toContain(expectedText);
  });
}

describe("getTestRunStatsTooltip", () => {
  beforeEach(() => {
    // @ts-ignore
    global.IS_REACT_ACT_ENVIRONMENT = true;
  });

  it("should handle a day with no test runs", () => {
    expectToContainText(
      getTestRunStatsTooltip(createChartDataType({})),
      "No tests were run on this day"
    );
  });

  it("should handle a day with only one failed test run", () => {
    expectToContainText(
      getTestRunStatsTooltip(
        createChartDataType({
          numFailedTestRuns: 1,
          numFailedTests: 1,
        })
      ),
      "1 test run failed",
      "All 1 tests failed"
    );
  });

  it("should handle a day with only one passing test run", () => {
    expectToContainText(
      getTestRunStatsTooltip(
        createChartDataType({
          numPassingTestRuns: 1,
          numPassingTests: 1,
        })
      ),
      "1 test run passed",
      "All 1 tests passed"
    );
  });

  it("should handle a day with only failed test runs", () => {
    expectToContainText(
      getTestRunStatsTooltip(
        createChartDataType({
          numFailedTestRuns: 15,
          numFailedTests: 1575,
        })
      ),
      "All 15 test runs contained at least one failing test",
      "All 1,575 tests failed"
    );
  });

  it("should handle a day with only passing test runs", () => {
    expectToContainText(
      getTestRunStatsTooltip(
        createChartDataType({
          numPassingTestRuns: 1000,
          numPassingTests: 2500,
        })
      ),
      "All 1,000 test runs passed",
      "All 2,500 tests passed"
    );
  });

  it("should handle a day with a mix of passing and failing test runs", () => {
    expectToContainText(
      getTestRunStatsTooltip(
        createChartDataType({
          numFailedTestRuns: 11,
          numPassingTestRuns: 40,
          numFailedTests: 166,
          numPassingTests: 5294,
        })
      ),
      "22% of 51 test runs contained at least one failing test",
      "166 tests failed out of 5,460 total tests"
    );
  });
});
