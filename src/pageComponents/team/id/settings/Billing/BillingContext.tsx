import { useWorkspaces } from "@/graphql/queries/useWorkspaces";
import { useWorkspaceSubscription } from "@/graphql/queries/useWorkspaceSubscription";
import { Workspace, WorkspaceSubscription } from "@/graphql/types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Dispatch, ReactNode, SetStateAction, createContext, useMemo, useState } from "react";

type View = "add-payment-method" | "price-details";

type ContextType = {
  refreshSubscription: () => Promise<void>;
  setView: Dispatch<SetStateAction<View | undefined>>;
  subscription: WorkspaceSubscription | undefined;
  view: View | undefined;
  workspace: Workspace | undefined;
  workspaceId: string;
};

export const BillingContext = createContext<ContextType>(null as any);

export function BillingContextRoot({
  children,
  stripeKey,
  workspaceId,
}: {
  children: ReactNode;
  stripeKey: string;
  workspaceId: string;
}) {
  const { refetch: refetchSubscription, subscription } = useWorkspaceSubscription(workspaceId);
  const { refetch: refetchWorkspaces, workspaces } = useWorkspaces();
  const workspace = workspaces?.find(({ id }) => id === workspaceId);

  const stripePromise = useMemo(() => loadStripe(stripeKey), [stripeKey]);

  const [view, setView] = useState<View | undefined>("price-details");

  const value = useMemo<ContextType>(
    () => ({
      refreshSubscription: async () => {
        await refetchSubscription({ workspaceId });
        await refetchWorkspaces();
      },
      setView,
      subscription,
      view,
      workspace,
      workspaceId,
    }),
    [refetchSubscription, refetchWorkspaces, subscription, view, workspace, workspaceId]
  );

  return (
    <Elements stripe={stripePromise}>
      <BillingContext.Provider value={value}>{children}</BillingContext.Provider>
    </Elements>
  );
}
