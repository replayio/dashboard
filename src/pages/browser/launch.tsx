import { EmptyLayout } from "@/components/EmptyLayout";
import { LaunchReplayModal } from "@/pageComponents/team/id/recordings/LaunchReplayModal";

export default function Page() {
  return <LaunchReplayModal onDismiss={noop} />;
}

Page.Layout = EmptyLayout;

function noop() {}
