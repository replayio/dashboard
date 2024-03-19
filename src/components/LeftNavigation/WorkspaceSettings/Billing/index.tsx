import { BillingAddPaymentMethod } from "@/components/LeftNavigation/WorkspaceSettings/Billing/BillingAddPaymentMethod";
import {
  BillingContext,
  BillingContextRoot,
} from "@/components/LeftNavigation/WorkspaceSettings/Billing/BillingContext";
import { BillingPriceDetails } from "@/components/LeftNavigation/WorkspaceSettings/Billing/BillingPricingDetails";
import { BillingTrialDetails } from "@/components/LeftNavigation/WorkspaceSettings/Billing/BillingTrialDetails";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useContext } from "react";

export function Billing({ workspaceId }: { workspaceId: string }) {
  return (
    <BillingContextRoot workspaceId={workspaceId}>
      <BillingWithData />
    </BillingContextRoot>
  );
}

function BillingWithData() {
  const { subscription, view, workspace } = useContext(BillingContext);

  if (!subscription || !workspace) {
    return <LoadingSpinner />;
  }

  switch (view) {
    case "add-payment-method":
      return <BillingAddPaymentMethod />;
    case "price-details":
      return <BillingPriceDetails />;
    case "trial-details":
      return <BillingTrialDetails />;
    default:
      return <div>Not implemented yet...</div>;
  }
}
