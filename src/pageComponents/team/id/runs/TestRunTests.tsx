import { DropDownMenu } from "@/components/DropDownMenu";
import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { TestStatusCapsule } from "@/components/TestStatusCapsule";
import { TestSuiteTest } from "@/graphql/types";
import { CenterAlignedPrompt } from "@/pageComponents/team/id/runs/CenterAlignedPrompt";
import { ExpandableSection } from "@/pageComponents/team/id/runs/ExpandableSection";
import { TestRunTestRow } from "@/pageComponents/team/id/runs/TestRunTestRow";
import { RunsViewContext } from "@/pageComponents/team/id/runs/TestRunsContext";
import { TEST_STATUS } from "@/pageComponents/team/id/runs/constants";
import { formatDuration, formatRelativeTime } from "@/utils/number";
import { getColorClassName } from "@/utils/test-suites";
import { useContext, useMemo } from "react";

export function TestRunTests() {
  const {
    isLoadingTests,
    isPending,
    selectedTestId,
    selectedTestRun,
    selectTest,
    testsFilterText,
    testsStatus,
    tests,
    showSelectTestRunPrompt,
    showTestsFilterMatchWarning,
    updateFilters,
  } = useContext(RunsViewContext);

  const { numFailed = 0, numFlaky = 0, numPassed = 0 } = selectedTestRun ?? {};

  const categorizedTests = useMemo(() => {
    const categorizedTests = {
      failed: {
        color: getColorClassName("failed"),
        count: numFailed,
        label: "Failed",
        tests: [] as TestSuiteTest[],
      },
      flaky: {
        color: getColorClassName("flaky"),
        count: numFlaky,
        label: "Flaky",
        tests: [] as TestSuiteTest[],
      },
      passed: {
        color: getColorClassName("passed"),
        count: numPassed,
        label: "Passed",
        tests: [] as TestSuiteTest[],
      },
    };

    tests?.forEach(test => {
      switch (test.status) {
        case "failed": {
          categorizedTests.failed.tests.push(test);
          break;
        }
        case "flaky": {
          categorizedTests.flaky.tests.push(test);
          break;
        }
        case "passed": {
          categorizedTests.passed.tests.push(test);
        }
      }
    });

    return categorizedTests;
  }, [numFailed, numFlaky, numPassed, tests]);

  let durationMs = 0;
  tests?.forEach(test => {
    durationMs += test.durationMs;
  });

  if (showSelectTestRunPrompt) {
    return <CenterAlignedPrompt>Select a run to see its details here</CenterAlignedPrompt>;
  }

  return (
    <>
      {isLoadingTests && <LoadingProgressBar />}

      {selectedTestRun && (
        <>
          <div className="flex flex-col gap-2" data-test-id="TestRunTests-Filters">
            <div className="flex flex-row gap-2 items-center">
              <div className="grow">
                <DropDownMenu
                  data-test-id="TestRun-StatusFilter"
                  disabled={isPending}
                  onChange={testsStatus => updateFilters({ testsStatus })}
                  options={TEST_STATUS}
                  value={testsStatus}
                />
              </div>
              <TestStatusCapsule count={numFailed} status="failed" />
              <TestStatusCapsule count={numFlaky} status="flaky" />
              <TestStatusCapsule count={numPassed} status="passed" />
            </div>
            <Input
              data-test-id="TestRun-TextFilter"
              defaultValue={testsFilterText}
              onConfirm={testsFilterText => updateFilters({ testsFilterText })}
              placeholder="Filter tests"
              type="text"
            />
          </div>
          <div
            className="flex flex-row flex-wrap gap-x-4 px-2 py-1 bg-slate-900 rounded"
            data-test-id="TestRunTests-Metadata"
          >
            <div className="flex flex-row items-center gap-1" suppressHydrationWarning>
              <Icon className="w-4 h-4" type="clock" />
              {formatRelativeTime(selectedTestRun.date)}
            </div>
            {selectedTestRun.user && (
              <div className="flex flex-row items-center gap-1">
                <Icon className="w-4 h-4" type="account" />
                {selectedTestRun.user}
              </div>
            )}
            {selectedTestRun.branchName && (
              <div className="flex flex-row items-center gap-1">
                <Icon
                  className="w-4 h-4"
                  type={selectedTestRun.isPrimaryBranch ? "primary-branch" : "secondary-branch"}
                />
                {selectedTestRun.branchName}
              </div>
            )}
            {durationMs > 0 && (
              <div className="flex flex-row items-center gap-1">
                <Icon className="w-4 h-4" type="clock" />
                {formatDuration(durationMs)}
              </div>
            )}
            {selectedTestRun.prNumber && selectedTestRun.repository && (
              <ExternalLink
                className="flex flex-row items-center gap-1"
                href={`https://github.com/${selectedTestRun.repository}/pull/${selectedTestRun.prNumber}`}
              >
                <Icon className="w-4 h-4" type="external-link" />
                {selectedTestRun.prNumber}
              </ExternalLink>
            )}
            {selectedTestRun.triggerUrl && (
              <ExternalLink
                className="flex flex-row items-center gap-1"
                href={selectedTestRun.triggerUrl}
              >
                <Icon className="w-4 h-4" type="external-link" />
                Workflow
              </ExternalLink>
            )}
          </div>
        </>
      )}

      {showTestsFilterMatchWarning ? (
        <CenterAlignedPrompt>No tests match the current filters.</CenterAlignedPrompt>
      ) : (
        <div className="flex flex-col gap-2 overflow-auto">
          {Object.values(categorizedTests).map(({ color, count, label, tests }) =>
            tests.length > 0 ? (
              <div
                className="bg-slate-900 text-white p-2 rounded"
                data-test-name="TestRunTests-Section"
                data-test-id={`TestRunTests-Section-${label}`}
                key={label}
              >
                <ExpandableSection
                  label={
                    <div
                      className={`font-bold mx-2 ${color}`}
                      data-test-name="TestRunTests-Section-Header"
                    >
                      {count === 1 ? `1 ${label} test` : `${count} ${label} tests`}
                    </div>
                  }
                  openByDefault={
                    label !== "Passed" ||
                    (selectedTestId != null &&
                      tests.find(test => test.id === selectedTestId) != null)
                  }
                >
                  {tests.map((test, index) => (
                    <TestRunTestRow
                      currentTestId={selectedTestId}
                      key={index}
                      selectTest={selectTest}
                      test={test}
                    />
                  ))}
                </ExpandableSection>
              </div>
            ) : null
          )}
        </div>
      )}
    </>
  );
}
