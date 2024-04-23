import { Button } from "@/components/Button";
import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useActivateWorkspaceSubscription } from "@/graphql/queries/useActivateWorkspaceSubscription";
import { useRemovePaymentMethod } from "@/graphql/queries/useRemovePaymentMethod";
import { WorkspaceSubscription } from "@/graphql/types";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { BillingContext } from "@/pageComponents/team/id/settings/Billing/BillingContext";
import { formatRelativeDate } from "@/utils/date";
import { formatCurrency } from "@/utils/number";
import {
  calculateMonthlyCost,
  cardToDisplayName,
  pricingDetailsForSubscription,
} from "@/utils/subscription";
import { isPlanBeta, isPlanPricingPerSeat } from "@/utils/test-suites";
import assert from "assert";
import { format } from "date-fns/format";
import { useContext } from "react";

export function BillingPriceDetails() {
  const { subscription } = useContext(BillingContext);

  if (!subscription) {
    return (
      <div className="flex flex-col px-2 py-1 rounded bg-slate-900 text-sm">
        <LoadingSpinner />
      </div>
    );
  }

  switch (subscription.status) {
    case "canceled": {
      return <SubscriptionStatusCanceled subscription={subscription} />;
    }
    case "trialing": {
      return <SubscriptionStatusTrialing subscription={subscription} />;
    }
    default: {
      return <SubscriptionDefaultView subscription={subscription} />;
    }
  }
}

function SubscriptionDefaultView({ subscription }: { subscription: WorkspaceSubscription }) {
  return (
    <div className="flex flex-col gap-2 h-full">
      <PricingDetailsPanel subscription={subscription} />
    </div>
  );
}

function SubscriptionStatusCanceled({ subscription }: { subscription: WorkspaceSubscription }) {
  const { setView, workspace, workspaceId } = useContext(BillingContext);
  assert(workspace);

  const { activateWorkspaceSubscription } = useActivateWorkspaceSubscription();

  const isPast = Date.now() - new Date(subscription.effectiveUntil!).getTime() > 0;

  const onClick = async () => {
    if (workspace.hasPaymentMethod) {
      assert(workspace.subscriptionPlanKey, "Subscription plan key not found");

      const paymentMethod = subscription.paymentMethods?.[0];
      assert(paymentMethod, "Payment method not found");

      await activateWorkspaceSubscription(
        workspaceId,
        workspace.subscriptionPlanKey,
        paymentMethod.id
      );
    } else {
      setView("add-payment-method");
    }
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      {isPast && (
        <div
          className="bg-yellow-300 text-yellow-950 px-2 py-1 rounded flex flex-row items-center gap-1 truncate"
          data-test-name="Header"
        >
          <Icon className="w-4 h-4" type="clock" />
          <div className="truncate">Subscription expired</div>
          <div className="grow" />
          <button
            className="text-black underline"
            data-test-id={
              workspace.hasPaymentMethod ? "ResumeSubscriptionLink" : "AddPaymentMethodLink"
            }
            onClick={onClick}
          >
            {workspace.hasPaymentMethod ? "Resume Subscription" : "Add payment method"}
          </button>
        </div>
      )}
      <PricingDetailsPanel subscription={subscription} />
    </div>
  );
}

function SubscriptionStatusTrialing({ subscription }: { subscription: WorkspaceSubscription }) {
  const { setView, workspace } = useContext(BillingContext);

  assert(workspace);

  return (
    <div className="flex flex-col gap-2 h-full">
      <div
        className="bg-yellow-300 text-yellow-950 px-2 py-1 flex flex-row items-center gap-1 rounded"
        data-test-name="Header"
      >
        <Icon className="w-4 h-4 shrink-0" type="clock" />
        Trial ends {formatRelativeDate(subscription.trialEnds)}
      </div>
      <div>
        Existing replays will continue to be debuggable. New replays will require an active
        subscription. <a href="mailto:support@replay.io">Email us</a> if you have any questions.
      </div>
      <PricingDetailsPanel subscription={subscription} />
      {workspace.hasPaymentMethod || (
        <div>
          <Button
            data-test-id="AddPaymentMethodButton"
            onClick={() => setView("add-payment-method")}
          >
            Add payment method
          </Button>
        </div>
      )}
      <ExternalLink href="https://www.replay.io/terms-of-use">
        Terms of service and cancellation policy
      </ExternalLink>
    </div>
  );
}

function PricingDetailsPanel({ subscription }: { subscription: WorkspaceSubscription }) {
  const { refreshSubscription, workspaceId } = useContext(BillingContext);

  const { removePaymentMethod } = useRemovePaymentMethod();

  const paymentMethod = subscription.paymentMethods?.[0];

  const { confirmationDialog, showConfirmationDialog } = useConfirmDialog(
    async (confirmed: boolean) => {
      if (confirmed) {
        if (paymentMethod) {
          await removePaymentMethod(workspaceId, paymentMethod.id);
          await refreshSubscription();
        }
      }
    },
    {
      confirmButtonLabel: "Remove payment method",
      message: (
        <div className="flex flex-col gap-2">
          <div>
            Removing a payment method will prevent any future charges for this subscription. You
            will need to a new payment method to continue your subscription beyond the current
            billing cycle.
          </div>
          {paymentMethod && (
            <div>
              Are you sure you want to remove the {cardToDisplayName(paymentMethod.card.brand)}{" "}
              ending with {paymentMethod.card.last4}?
            </div>
          )}
        </div>
      ),
      title: "Remove payment method",
    }
  );

  const pricingDetails = subscription ? pricingDetailsForSubscription(subscription) : null;

  let effectiveUntilLabel = "Renewal date";
  switch (subscription.status) {
    case "trialing":
      if (subscription.paymentMethods?.length) {
        effectiveUntilLabel = "Your team’s start date";
      }
      break;
    case "canceled":
      effectiveUntilLabel = "Subscription end date";
      break;
  }

  return pricingDetails ? (
    <div className="flex flex-col gap-2 h-full">
      {isPlanBeta(subscription) && (
        <div
          className="bg-yellow-300 text-yellow-950 px-2 py-1 rounded flex flex-row items-center gap-1 truncate"
          data-test-name="Header"
        >
          <Icon className="w-4 h-4" type="warning" />
          <div className="truncate">
            You&apos;re currently on a beta plan offered at no cost. We&apos;ll inform you of any
            updates or changes.
          </div>
        </div>
      )}
      <div
        className="flex flex-col gap-px rounded overflow-hidden"
        data-test-id="PricingDetailsTable"
      >
        <div className="flex flex-row items-center px-2 py-1 bg-slate-900">
          <div className="grow">{effectiveUntilLabel}</div>
          <div>
            {subscription?.effectiveUntil ? format(subscription?.effectiveUntil, "MMM d, y") : ""}
          </div>
        </div>
        <div className="flex flex-row items-center px-2 py-1 bg-slate-900">
          <div className="grow">Renewal schedule</div>
          <div className="capitalize">{pricingDetails?.billingSchedule ?? "monthly"}</div>
        </div>
        {isPlanPricingPerSeat(subscription) && (
          <>
            <div className="flex flex-row items-center px-2 py-1 bg-slate-900">
              <div className="grow">Number of seats</div>
              <div>{subscription.seatCount}</div>
            </div>
            <div className="flex flex-row items-center px-2 py-1 bg-slate-900">
              <div className="grow">Cost per seat</div>
              <div>
                {pricingDetails?.seatPrice != null ? formatCurrency(pricingDetails.seatPrice) : ""}
              </div>
            </div>
          </>
        )}
        <div className="flex flex-row items-center px-2 py-1 bg-slate-900">
          <div className="grow">Monthly charge</div>
          <div>{formatCurrency(calculateMonthlyCost(subscription, pricingDetails))}</div>
        </div>
        {paymentMethod && (
          <div className="flex flex-row items-center px-2 py-1 bg-slate-900">
            <div className="grow">Payment method</div>
            <div>
              <button
                className="text-sky-500 outline-0 hover:underline focus:underline"
                data-test-id="RemovePaymentMethodButton"
                onClick={showConfirmationDialog}
              >
                {cardToDisplayName(paymentMethod.card.brand)} ending with {paymentMethod.card.last4}
              </button>
            </div>

            {confirmationDialog}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="flex flex-col px-2 py-1 rounded bg-slate-900 text-sm">
      <LoadingSpinner />
    </div>
  );
}
