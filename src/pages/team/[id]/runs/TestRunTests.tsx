import { DropDownMenu } from "@/components/DropDownMenu";
import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { PageLoadingPlaceholder } from "@/components/PageLoadingPlaceholder";
import { TestStatusCapsule } from "@/components/TestStatusCapsule";
import { useTestSuiteTestRuns } from "@/graphql/queries/useTestSuiteTestRuns";
import { useTestSuiteTests } from "@/graphql/queries/useTestSuiteTests";
import { TestSuiteTest } from "@/graphql/types";
import { TestRunTestRow } from "@/pages/team/[id]/runs/TestRunTestRow";
import { formatDuration, formatRelativeTime } from "@/utils/number";
import { filterTest, getColorClassName } from "@/utils/test-suites";
import assert from "assert";
import { Fragment, useCallback, useMemo, useState, useTransition } from "react";

const STATUS = {
  all: "All runs",
  failed: "Failed and flaky",
};
type Status = keyof typeof STATUS;

export function TestRunTests({
  selectedTestId,
  selectedTestRunId,
  selectTest,
  workspaceId,
}: {
  selectedTestId: string | null;
  selectedTestRunId: string;
  selectTest: (id: string) => void;
  workspaceId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const [filterText, setFilterText] = useState<string>("");
  const setFilterTextTransition = useCallback((text: string) => {
    startTransition(() => {
      setFilterText(text);
    });
  }, []);

  const [status, setStatus] = useState<Status>("all");
  const setStatusTransition = useCallback((status: Status) => {
    startTransition(() => {
      setStatus(status);
    });
  }, []);

  const { testRuns } = useTestSuiteTestRuns(workspaceId);
  const selectedTestRun = testRuns?.find(
    (testRun) => testRun.id === selectedTestRunId
  );
  assert(selectedTestRun, `No test run found for id "${selectedTestRunId}"`);

  // TODO This is returning stale data when re-viewing the same test run
  const { isLoading, tests } = useTestSuiteTests(
    workspaceId,
    selectedTestRunId
  );
  const filteredTests =
    !isLoading && tests
      ? tests
          .filter((test) =>
            filterTest(test, {
              status,
              text: filterText,
            })
          )
          .sort((a, b) => a.title.localeCompare(b.title))
      : null;

  const categorizedTests = useMemo(() => {
    const categorizedTests = {
      failed: {
        color: getColorClassName("failed"),
        count: selectedTestRun?.numFailed ?? 0,
        label: "Failed",
        tests: [] as TestSuiteTest[],
      },
      flaky: {
        color: getColorClassName("flaky"),
        count: selectedTestRun?.numFlaky ?? 0,
        label: "Flaky",
        tests: [] as TestSuiteTest[],
      },
      passed: {
        color: getColorClassName("passed"),
        count: selectedTestRun?.numPassed ?? 0,
        label: "Passed",
        tests: [] as TestSuiteTest[],
      },
    };

    filteredTests?.forEach((test) => {
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
  }, [filteredTests, selectedTestRun]);

  let durationMs = 0;
  tests?.forEach((test) => {
    durationMs += test.durationMs;
  });

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
          <div className="grow">
            <DropDownMenu
              disabled={isPending}
              onChange={setStatusTransition}
              options={STATUS}
              value={status}
            />
          </div>
          <TestStatusCapsule
            count={selectedTestRun.numFailed}
            status="failed"
          />
          <TestStatusCapsule count={selectedTestRun.numFlaky} status="flaky" />
          <TestStatusCapsule
            count={selectedTestRun.numPassed}
            status="passed"
          />
        </div>
        <Input
          defaultValue={filterText}
          onConfirm={(value) => setFilterTextTransition(value)}
          placeholder="Filter tests"
          type="text"
        />
      </div>

      <div className="flex flex-row flex-wrap gap-x-4 px-2 py-1 bg-slate-900 rounded">
        <div className="flex flex-row items-center gap-1">
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
              type={
                selectedTestRun.isPrimaryBranch
                  ? "primary-branch"
                  : "secondary-branch"
              }
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

      {isLoading ? (
        <PageLoadingPlaceholder />
      ) : (
        <div className="overflow-auto -mx-1">
          {Object.values(categorizedTests).map(
            ({ color, count, label, tests }) =>
              count > 0 ? (
                <Fragment key={label}>
                  <div className={`font-bold mx-1 ${color}`}>
                    {count === 1
                      ? `1 ${label} test`
                      : `${count} ${label} tests`}
                  </div>
                  {tests.map((test, index) => (
                    <TestRunTestRow
                      currentTestId={selectedTestId}
                      key={index}
                      selectTest={selectTest}
                      test={test}
                    />
                  ))}
                </Fragment>
              ) : null
          )}
        </div>
      )}
    </>
  );
}
