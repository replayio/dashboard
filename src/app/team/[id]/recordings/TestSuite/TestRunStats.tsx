import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { TestRun } from "@/graphql/types";
import { formatRelativeTime } from "@/utils/number";

export function TestRunStats({ testRun }: { testRun: TestRun }) {
  return (
    <div className="flex flex-row flex-wrap gap-x-4 p-1 bg-slate-700 rounded">
      <div className="flex flex-row items-center gap-1">
        <Icon className="w-4 h-4" type="clock" />
        {formatRelativeTime(testRun.date)}
      </div>
      {testRun.user && (
        <div className="flex flex-row items-center gap-1">
          <Icon className="w-4 h-4" type="account" />
          {testRun.user}
        </div>
      )}
      {testRun.branchName && (
        <div className="flex flex-row items-center gap-1">
          <Icon
            className="w-4 h-4"
            type={
              testRun.isPrimaryBranch ? "primary-branch" : "secondary-branch"
            }
          />
          {testRun.branchName}
        </div>
      )}
      {testRun.prNumber && testRun.repository && (
        <ExternalLink
          className="flex flex-row items-center gap-1"
          href={`https://github.com/${testRun.repository}/pull/${testRun.prNumber}`}
        >
          <Icon className="w-4 h-4" type="external-link" />
          {testRun.prNumber}
        </ExternalLink>
      )}
      {testRun.triggerUrl && (
        <ExternalLink
          className="flex flex-row items-center gap-1"
          href={testRun.triggerUrl}
        >
          <Icon className="w-4 h-4" type="external-link" />
          Workflow
        </ExternalLink>
      )}
    </div>
  );
}
