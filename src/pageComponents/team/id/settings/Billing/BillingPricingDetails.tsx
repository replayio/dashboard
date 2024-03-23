import { Button } from "@/components/Button";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useRemovePaymentMethod } from "@/graphql/queries/useRemovePaymentMethod";
import { WorkspaceSubscription } from "@/graphql/types";
import { BillingContext } from "@/pageComponents/team/id/settings/Billing/BillingContext";
import { formatRelativeDate } from "@/utils/date";
import { formatCurrency } from "@/utils/number";
import {
  calculateMonthlyCost,
  cardToDisplayName,
  pricingDetailsForSubscription,
} from "@/utils/subscription";
import { format } from "date-fns/format";
import { ReactNode, useContext, useState } from "react";

export function BillingPriceDetails() {
  const { setView, subscription, workspace, workspaceId } =
    useContext(BillingContext);

  const [confirmRemovePayment, setConfirmRemovePayment] = useState(false);

  const { removePaymentMethod } = useRemovePaymentMethod();

  const paymentMethod = subscription?.paymentMethods?.[0];
  if (paymentMethod) {
    const confirmRemovePaymentMethod = async () => {
      setConfirmRemovePayment(false);

      await removePaymentMethod(workspaceId, paymentMethod.id);
    };

    return (
      <div className="flex flex-col gap-2 h-full">
        {subscription?.status === "trialing" && (
          <div className="bg-yellow-300 text-yellow-950 px-2 py-1 rounded flex flex-row items-center gap-2 truncate">
            <Icon className="w-4 h-4" type="clock" />
            Trial ends {formatRelativeDate(subscription.trialEnds)}
          </div>
        )}
        <PricingDetailsPanel subscription={subscription}>
          <div className="flex flex-row items-center px-2 py-1 bg-slate-900">
            <div className="grow">Payment method</div>
            <div>
              <button
                className="text-sky-500 outline-0 hover:underline focus:underline"
                onClick={() => setConfirmRemovePayment(true)}
              >
                {cardToDisplayName(paymentMethod.card.brand)} ending with{" "}
                {paymentMethod.card.last4}
              </button>
            </div>
          </div>
        </PricingDetailsPanel>
        {confirmRemovePayment && (
          <ConfirmationDialog
            confirmButtonLabel="Remove payment method"
            message={
              <div className="flex flex-col gap-2">
                <div>
                  Removing a payment method will prevent any future charges for
                  this subscription. You will need to a new payment method to
                  continue your subscription beyond the current billing cycle.
                </div>
                <div>
                  Are you sure you want to remove the{" "}
                  {cardToDisplayName(paymentMethod.card.brand)} ending with{" "}
                  {paymentMethod.card.last4}?
                </div>
              </div>
            }
            onCancel={() => setConfirmRemovePayment(false)}
            onConfirm={confirmRemovePaymentMethod}
            title="Remove payment method"
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-2 h-full">
        <div>
          Replay&apos;s team Plan can expand your debugging superpowers with
          collaboration features that make it easy to work together to fix bugs
          and understand your software better.{" "}
          <ExternalLink href="https://www.replay.io/pricing">
            Learn more
          </ExternalLink>
        </div>
        {subscription && <PricingDetailsPanel subscription={subscription} />}
        <div>
          <Button onClick={() => setView("add-payment-method")}>
            Add payment method
          </Button>
        </div>
        <ExternalLink href="https://www.replay.io/terms-of-use">
          Terms of service and cancellation policy
        </ExternalLink>
      </div>
    );
  }
}

function PricingDetailsPanel({
  children = null,
  subscription,
}: {
  children?: ReactNode;
  subscription: WorkspaceSubscription;
}) {
  const pricingDetails = subscription
    ? pricingDetailsForSubscription(subscription)
    : null;

  return pricingDetails ? (
    <div className="flex flex-col gap-px rounded overflow-hidden">
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
          {formatCurrency(calculateMonthlyCost(subscription, pricingDetails))}
        </div>
      </div>
      {children}
    </div>
  ) : (
    <div className="flex flex-col px-2 py-1 rounded bg-slate-900 text-sm">
      <LoadingSpinner />
    </div>
  );
}
