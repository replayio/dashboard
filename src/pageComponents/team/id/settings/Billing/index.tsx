import { BillingAddPaymentMethod } from "@/pageComponents/team/id/settings/Billing/BillingAddPaymentMethod";
import {
  BillingContext,
  BillingContextRoot,
} from "@/pageComponents/team/id/settings/Billing/BillingContext";
import { BillingPriceDetails } from "@/pageComponents/team/id/settings/Billing/BillingPricingDetails";
import { BillingTrialDetails } from "@/pageComponents/team/id/settings/Billing/BillingTrialDetails";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useContext } from "react";

export function Billing({
  stripeKey,
  workspaceId,
}: {
  stripeKey: string;
  workspaceId: string;
}) {
  return (
    <BillingContextRoot stripeKey={stripeKey} workspaceId={workspaceId}>
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
