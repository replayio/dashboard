import { Button } from "@/components/Button";
import { BillingContext } from "@/components/LeftNavigation/WorkspaceSettings/Billing/BillingContext";
import assert from "assert";
import { differenceInCalendarDays } from "date-fns/differenceInCalendarDays";
import { useContext } from "react";

export function BillingTrialDetails() {
  const { setView, subscription } = useContext(BillingContext);
  assert(subscription != null, "Subscription not found");

  const days = subscription
    ? differenceInCalendarDays(subscription.trialEnds, new Date())
    : 0;

  const onClick = () => {
    setView("price-details");
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        Free Trial will be expiring in <strong>{days} days</strong>.
      </div>
      <div>
        Existing replays will continue to be debuggable. New replays will
        require an active subscription. Feel free to{" "}
        <a href="mailto:support@replay.io">email</a> us if you have any
        questions.
      </div>
      <div>
        <Button onClick={onClick}>Team plan pricing</Button>
      </div>
    </div>
  );
}
