import { PendingWorkspace } from "@/graphql/types";
import { FakeRecordingRow } from "@/pageComponents/team/id/pending/FakeRecordingRow";
import { PendingInvitationModal } from "@/pageComponents/team/id/pending/PendingInvitationModal";

const fakeRecordingRows = Array.from({ length: 20 }, (_, i) => i);

export function PendingPage({
  isTest,
  workspace,
}: {
  isTest: boolean;
  workspace: PendingWorkspace;
}) {
  return (
    <div className="w-full h-full relative">
      <div className="flex flex-col gap-2 overflow-auto overflow-hidden h-full p-2">
        <div className="overflow-auto flex flex-col gap-2 grow">
          <div className="overflow-auto bg-slate-900 text-white rounded flex flex-col gap-px grow relative">
            {fakeRecordingRows.map((_, index) => (
              <FakeRecordingRow key={index} />
            ))}
          </div>
        </div>
      </div>
      <PendingInvitationModal isTest={isTest} workspace={workspace} />
    </div>
  );
}
