import { LaunchReplayButton } from "@/app/team/[id]/recordings/LaunchReplayButton";
import { LibrarySearchInput } from "@/app/team/[id]/recordings/LibrarySearchInput";
import { PageLoadingPlaceholder } from "@/components/PageLoadingPlaceholder";

export default function Loading() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex flex-row items-center gap-2 justify-between">
        <LibrarySearchInput disabled numRecordings={0} />
        <LaunchReplayButton />
      </div>
      <div className="bg-slate-800 text-white p-2 rounded">
        <PageLoadingPlaceholder />
      </div>
    </div>
  );
}
