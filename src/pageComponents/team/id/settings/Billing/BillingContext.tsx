import { useNonPendingWorkspaces } from "@/graphql/queries/useNonPendingWorkspaces";
import { useWorkspaceSubscription } from "@/graphql/queries/useWorkspaceSubscription";
import { Workspace, WorkspaceSubscription } from "@/graphql/types";
import { inUnpaidFreeTrial } from "@/utils/subscription";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type View =
  | "add-payment-method"
  | "confirm-payment-method"
  | "delete-payment-method"
  | "details"
  | "price-details"
  | "trial-details";

type ContextType = {
  refreshSubscription: () => void;
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
  const { refetch, subscription } = useWorkspaceSubscription(workspaceId);
  const { workspaces } = useNonPendingWorkspaces();
  const workspace = workspaces?.find(({ id }) => id === workspaceId);

  const stripePromise = useMemo(() => loadStripe(stripeKey), [stripeKey]);

  useEffect(() => {
    if (subscription && workspace) {
      if (inUnpaidFreeTrial(workspace, subscription)) {
        setView("trial-details");
      } else {
        setView("price-details");
      }
    }
  }, [subscription, workspace]);

  const [view, setView] = useState<View | undefined>(undefined);

  const value = useMemo<ContextType>(
    () => ({
      refreshSubscription: () => refetch({ workspaceId }),
      setView,
      subscription,
      view,
      workspace,
      workspaceId,
    }),
    [refetch, subscription, view, workspace, workspaceId]
  );

  return (
    <Elements stripe={stripePromise}>
      <BillingContext.Provider value={value}>
        {children}
      </BillingContext.Provider>
    </Elements>
  );
}
