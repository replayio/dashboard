import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { PageLoadingPlaceholder } from "@/components/PageLoadingPlaceholder";
import { WorkspaceRecording } from "@/graphql/types";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import { LaunchReplayModal } from "@/routes/team/id/recordings/LaunchReplayModal";
import { RecordingRow } from "@/routes/team/id/recordings/RecordingRow";
import { formatNumber } from "@/utils/number";
import { ChangeEvent, useMemo, useState, useTransition } from "react";

const PAGE_SIZE = 25;

export default function RecordingPage({
  isLoading,
  recordings: allRecordings,
}: {
  isLoading: boolean;
  recordings: WorkspaceRecording[] | undefined;
}) {
  const [isPending, startTransition] = useTransition();

  const [filter, setFilter] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [showLaunchModal, setShowLaunchModal] = useState(false);

  const [filteredRecordings, numTotalRecords] = useMemo(() => {
    let recordings = allRecordings;

    if (filter) {
      recordings = recordings?.filter((recording) =>
        recording.title.toLowerCase().includes(filter.toLowerCase())
      );
    }

    const numTotalRecords = recordings?.length ?? 0;

    recordings = recordings?.slice(0, limit);

    return [recordings, numTotalRecords];
  }, [allRecordings, filter, limit]);

  const onFilterConfirm = (value: string) => {
    startTransition(() => {
      setFilter(value);
    });
  };

  const onShowMoreClick = () => {
    startTransition(() => {
      setLimit(Math.min(limit + PAGE_SIZE, numTotalRecords));
    });
  };

  return (
    <div className="flex flex-col gap-2 overflow-auto overflow-hidden p-2">
      <div className="flex flex-row items-center gap-2 justify-between">
        <Input
          defaultValue={filter}
          disabled={isPending}
          onConfirm={onFilterConfirm}
          placeholder={
            isLoading
              ? "Search recordings"
              : `Search ${formatNumber(numTotalRecords)} recordings`
          }
          type="text"
        />

        <Button onClick={() => setShowLaunchModal(true)}>Launch Replay</Button>
        {showLaunchModal && (
          <LaunchReplayModal onDismiss={() => setShowLaunchModal(false)} />
        )}
      </div>
      <div className="overflow-auto flex flex-col gap-2">
        <div className="overflow-auto bg-slate-900 text-white rounded flex flex-col gap-px">
          {filteredRecordings?.map((recording) => (
            <RecordingRow key={recording.uuid} recording={recording} />
          ))}
          {!isLoading && limit < numTotalRecords && (
            <div
              className={`flex flex-row items-center justify-center gap-2 px-4 py-2 bg-slate-800 font-bold cursor-pointer text-sky-300 ${
                isPending ? "text-gray-500" : ""
              }`}
              onClick={onShowMoreClick}
            >
              <Icon
                className={`w-4 h-4 ${isPending ? "animate-spin" : ""}`}
                type={isPending ? "loading-spinner" : "show-more"}
              />
              Show More
            </div>
          )}
          {!isLoading && numTotalRecords === 0 && (
            <div>No recordings have been uploaded yet.</div>
          )}
          {isLoading && <PageLoadingPlaceholder />}
        </div>
      </div>
    </div>
  );
}