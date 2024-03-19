import { Button } from "@/components/Button";
import { ExternalLink } from "@/components/ExternalLink";
import { BillingContext } from "@/components/DefaultLayout/WorkspaceSettings/Billing/BillingContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { formatCurrency } from "@/utils/number";
import {
  calculateMonthlyCost,
  pricingDetailsForSubscription,
} from "@/utils/subscription";
import assert from "assert";
import { format } from "date-fns/format";
import { useContext } from "react";

export function BillingPriceDetails() {
  const { setView, subscription } = useContext(BillingContext);
  assert(subscription != null, "Subscription not found");

  const pricingDetails = subscription
    ? pricingDetailsForSubscription(subscription)
    : null;

  const onClick = () => {
    setView("add-payment-method");
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="grow">
        Replay&apos;s team Plan can expand your debugging superpowers with
        collaboration features that make it easy to work together to fix bugs
        and understand your software better.{" "}
        <ExternalLink href="https://www.replay.io/pricing">
          Learn more
        </ExternalLink>
      </div>
      {pricingDetails ? (
        <div className="flex flex-col gap-px rounded overflow-hidden text-sm">
          <div className="flex flex-row items-center px-2 py-1 bg-slate-900">
            <div className="grow">Your team&apos;s start date</div>
            <div>
              {subscription?.trialEnds
                ? format(subscription?.trialEnds, "MMM d, y")
                : ""}
            </div>
          </div>
          <div className="flex flex-row items-center px-2 py-1 bg-slate-900">
            <div className="grow">Renewal schedule</div>
            <div className="capitalize">
              {pricingDetails?.billingSchedule ?? "monthly"}
            </div>
          </div>
          <div className="flex flex-row items-center px-2 py-1 bg-slate-900">
            <div className="grow">Number of seats</div>
            <div>{subscription.seatCount}</div>
          </div>
          <div className="flex flex-row items-center px-2 py-1 bg-slate-900">
            <div className="grow">Cost per seat</div>
            <div>
              {pricingDetails?.seatPrice != null
                ? formatCurrency(pricingDetails.seatPrice)
                : ""}
            </div>
          </div>
          <div className="flex flex-row items-center px-2 py-1 bg-slate-900">
            <div className="grow">Monthly charge</div>
            <div>
              {formatCurrency(
                calculateMonthlyCost(subscription, pricingDetails)
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col px-2 py-1 rounded bg-slate-900 text-sm">
          <LoadingSpinner />
        </div>
      )}
      <div>
        <Button onClick={onClick}>Add payment method</Button>
      </div>
      <div className="grow flex flex-col justify-end">
        <ExternalLink
          className="text-sm"
          href="https://www.replay.io/terms-of-use"
        >
          Terms of service and cancellation policy
        </ExternalLink>
      </div>
    </div>
  );
}
