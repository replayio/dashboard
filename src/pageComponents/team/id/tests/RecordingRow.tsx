import { Icon } from "@/components/Icon";
import { TestSuiteTestExecutionRecording, TestSuiteTestStatus } from "@/graphql/types";
import { getRelativeDate } from "@/utils/date";
import { getURL } from "@/utils/recording";
import { getColorClassName } from "@/utils/test-suites";
import Link from "next/link";

export function RecordingRow({
  recording,
  retentionLimit,
  status,
}: {
  recording: TestSuiteTestExecutionRecording;
  retentionLimit: number;
  status: TestSuiteTestStatus;
}) {
  const url = getURL(recording.id, recording.buildId);

  const iconType = recording.isProcessed ? "processed-recording" : "unprocessed-recording";

  const isWithinRetentionLimit =
    recording.createdAt.getTime() >= getRelativeDate({ daysAgo: retentionLimit }).getTime();

  if (isWithinRetentionLimit) {
    const colorClassName = getColorClassName(status);

    return (
      <Link
        className="flex flex-row items-center gap-2 text-white px-2 py-1 hover:bg-slate-700"
        data-status-viewable
        data-test-name="RecordingRow"
        href={url ?? ""}
      >
        <Icon className={`w-6 h-6 shrink-0 ${colorClassName}`} type={iconType} />
        <div className="truncate shrink">View recording</div>
      </Link>
    );
  } else {
    return (
      <div
        className="flex flex-row items-center gap-2 text-white px-2 py-1"
        data-status-not-viewable
        data-test-name="RecordingRow"
      >
        <Icon className="w-6 h-6 shrink-0 text-slate-400" type={iconType} />
        <div className="truncate shrink text-slate-400">Recording not available</div>
      </div>
    );
  }
}
