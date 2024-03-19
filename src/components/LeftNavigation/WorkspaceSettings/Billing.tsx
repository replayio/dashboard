import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useWorkspaceSubscription } from "@/graphql/queries/useWorkspaceSubscription";

export function Billing({ workspaceId }: { workspaceId: string }) {
  const { subscription } = useWorkspaceSubscription(workspaceId);

  // TODO Show the right default panel

  return subscription ? <div>Not implemented yet...</div> : <LoadingSpinner />;
}
