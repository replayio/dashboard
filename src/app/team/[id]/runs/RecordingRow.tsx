import { Icon } from "@/components/Icon";
import { TestSuiteTestRecording, TestSuiteTestStatus } from "@/graphql/types";
import { formatRelativeTime } from "@/utils/number";
import { getURL } from "@/utils/recording";
import { getColorClassName } from "@/utils/test-suites";
import Link from "next/link";

export function RecordingRow({
  recording,
  status,
}: {
  recording: TestSuiteTestRecording;
  status: TestSuiteTestStatus;
}) {
  const url = getURL(recording.id, recording.buildId);

  const colorClassName = getColorClassName(status);
  const iconType = recording.isProcessed
    ? "processed-recording"
    : "unprocessed-recording";

  return (
    <Link
      className="flex flex-row items-center gap-2 text-white px-2 py-1 rounded hover:bg-slate-700"
      href={url ?? ""}
    >
      <Icon className={`w-6 h-6 shrink-0 ${colorClassName}`} type={iconType} />
      <div className="truncate shrink">View recording</div>
      <div className="flex flex-row gap-1 items-center shrink-0 text-sm text-slate-300">
        <Icon className="w-4 h-4" type="clock" />
        {formatRelativeTime(recording.createdAt)}
      </div>
    </Link>
  );
}
