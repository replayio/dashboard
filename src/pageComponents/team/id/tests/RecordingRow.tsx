import { Icon } from "@/components/Icon";
import {
  TestSuiteTestExecutionRecording,
  TestSuiteTestStatus,
} from "@/graphql/types";
import { getURL } from "@/utils/recording";
import { getColorClassName } from "@/utils/test-suites";
import Link from "next/link";

export function RecordingRow({
  recording,
  status,
}: {
  recording: TestSuiteTestExecutionRecording;
  status: TestSuiteTestStatus;
}) {
  const url = getURL(recording.id, recording.buildId);

  const colorClassName = getColorClassName(status);
  const iconType = recording.isProcessed
    ? "processed-recording"
    : "unprocessed-recording";

  return (
    <Link
      className="flex flex-row items-center gap-2 text-white px-2 py-1 hover:bg-slate-700 hover:text-white"
      href={url ?? ""}
    >
      <Icon className={`w-6 h-6 shrink-0 ${colorClassName}`} type={iconType} />
      <div className="truncate shrink">View recording</div>
    </Link>
  );
}
