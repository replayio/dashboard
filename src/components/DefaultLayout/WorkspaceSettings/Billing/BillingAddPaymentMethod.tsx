import { BillingContext } from "@/components/DefaultLayout/WorkspaceSettings/Billing/BillingContext";
import assert from "assert";
import { useContext } from "react";

export function BillingAddPaymentMethod() {
  const { setView, subscription } = useContext(BillingContext);
  assert(subscription != null, "Subscription not found");

  return (
    <div className="flex flex-col gap-2">
      <div>Add payment method</div>
    </div>
  );
}
