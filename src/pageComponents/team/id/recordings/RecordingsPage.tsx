import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { SessionContext } from "@/components/SessionContext";
import { useWorkspaces } from "@/graphql/queries/useWorkspaces";
import { WorkspaceRecording } from "@/graphql/types";
import { LaunchReplayModal } from "@/pageComponents/team/id/recordings/LaunchReplayModal";
import { RecordingRow } from "@/pageComponents/team/id/recordings/RecordingRow";
import { formatNumber } from "@/utils/number";
import { useContext, useMemo, useState, useTransition } from "react";

const PAGE_SIZE = 25;

export default function RecordingPage({
  isLoading,
  recordings: allRecordings,
}: {
  isLoading: boolean;
  recordings: WorkspaceRecording[] | undefined;
}) {
  const [isPending, startTransition] = useTransition();

  const { user } = useContext(SessionContext);
  const { workspaces } = useWorkspaces();

  const [filter, setFilter] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [showLaunchModal, setShowLaunchModal] = useState(false);

  const [filteredRecordings, numTotalRecords] = useMemo(() => {
    let recordings = allRecordings;

    if (filter) {
      recordings = recordings?.filter(recording =>
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
    <div className="flex flex-col h-full gap-5 p-5 overflow-auto overflow-hidden">
      <div className="flex flex-row items-center justify-between gap-2">
        <Input
          data-test-id="filter-input"
          defaultValue={filter}
          disabled={isPending}
          onConfirm={onFilterConfirm}
          placeholder={
            isLoading ? "Search recordings" : `Search ${formatNumber(numTotalRecords)} recordings`
          }
          type="text"
        />

        {showLaunchModal && <LaunchReplayModal onDismiss={() => setShowLaunchModal(false)} />}
      </div>
      <div className="flex flex-col overflow-auto grow">
        <div className="relative flex flex-col overflow-auto text-foreground rounded-lg border border-border bg-card grow">
          {isLoading && <LoadingProgressBar />}
          {user &&
            workspaces &&
            filteredRecordings?.map(recording => (
              <RecordingRow
                key={recording.uuid}
                recording={recording}
                user={user}
                workspaces={workspaces}
              />
            ))}
          {!isLoading && limit < numTotalRecords && (
            <button
              className="flex flex-row items-center justify-center gap-2 px-4 py-3 font-medium cursor-pointer text-sm text-primary hover:bg-accent transition-colors border-t border-border"
              onClick={onShowMoreClick}
            >
              <Icon
                className={`w-4 h-4 ${isPending ? "animate-spin" : ""}`}
                type={isPending ? "loading-spinner" : "show-more"}
              />
              Show More
            </button>
          )}
          {!isLoading && numTotalRecords === 0 && (
            <div className="p-6 text-sm text-muted-foreground text-center">
              No recordings have been uploaded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
