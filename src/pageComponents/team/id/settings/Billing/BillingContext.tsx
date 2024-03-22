import { STRIPE_KEYS } from "@/constants";
import { useNonPendingWorkspaces } from "@/graphql/queries/useNonPendingWorkspaces";
import { useWorkspaceSubscription } from "@/graphql/queries/useWorkspaceSubscription";
import { Workspace, WorkspaceSubscription } from "@/graphql/types";
import { inUnpaidFreeTrial } from "@/utils/subscription";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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

export const stripePromise = loadStripe(
  process.env.NODE_ENV === "development"
    ? STRIPE_KEYS.DEVELOPMENT
    : STRIPE_KEYS.PRODUCTION
);

type ContextType = {
  setView: Dispatch<SetStateAction<View | undefined>>;
  subscription: WorkspaceSubscription | undefined;
  view: View | undefined;
  workspace: Workspace | undefined;
};

export const BillingContext = createContext<ContextType>(null as any);

export function BillingContextRoot({
  children,
  workspaceId,
}: {
  children: ReactNode;
  workspaceId: string;
}) {
  const { subscription } = useWorkspaceSubscription(workspaceId);
  const { workspaces } = useNonPendingWorkspaces();
  const workspace = workspaces?.find(({ id }) => id === workspaceId);

  useEffect(() => {
    if (subscription && workspace) {
      if (inUnpaidFreeTrial(workspace, subscription)) {
        setView("trial-details");
      } else {
        // TODO
      }
    }
  }, [subscription, workspace]);

  const [view, setView] = useState<View | undefined>(undefined);

  const value = useMemo<ContextType>(
    () => ({
      setView,
      subscription,
      view,
      workspace,
    }),
    [subscription, view, workspace]
  );

  return (
    <Elements stripe={stripePromise}>
      <BillingContext.Provider value={value}>
        {children}
      </BillingContext.Provider>
    </Elements>
  );
}
