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
import { ReactNode, useContext } from "react";

export function BillingPriceDetails() {
  const { subscription } = useContext(BillingContext);

  if (!subscription) {
    return (
      <div className="flex flex-col p-6 rounded-lg border border-border bg-card">
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
    <div className="flex flex-col gap-6 h-full py-4">
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
    <div className="flex flex-col gap-6 h-full py-4">
      {isPast && (
        <div
          className="rounded-lg border border-amber-500/50 bg-amber-500/10 px-4 py-3 flex flex-row items-center gap-2"
          data-test-name="Header"
        >
          <Icon className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" type="clock" />
          <div className="grow text-sm font-medium">Subscription expired</div>
          <button
            className="text-sm font-medium text-primary hover:underline shrink-0"
            data-test-id={
              workspace.hasPaymentMethod ? "ResumeSubscriptionLink" : "AddPaymentMethodLink"
            }
            onClick={onClick}
          >
            {workspace.hasPaymentMethod ? "Resume subscription" : "Add payment method"}
          </button>
        </div>
      )}
      <PricingDetailsPanel hideAddPaymentMethodFooter subscription={subscription} />
    </div>
  );
}

function SubscriptionStatusTrialing({ subscription }: { subscription: WorkspaceSubscription }) {
  const { setView, workspace } = useContext(BillingContext);

  assert(workspace);

  return (
    <div className="flex flex-col gap-6 h-full py-4">
      <div
        className="rounded-lg border border-amber-500/50 bg-amber-500/10 px-4 py-3 flex flex-row items-center gap-2"
        data-test-name="Header"
      >
        <Icon className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" type="clock" />
        <div className="text-sm font-medium">
          Trial ends {formatRelativeDate(subscription.trialEnds)}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Existing replays will continue to be debuggable. New replays will require an active
        subscription.{" "}
        <a href="mailto:support@replay.io" className="text-primary hover:underline">
          Email us
        </a>{" "}
        if you have any questions.
      </p>
      <PricingDetailsPanel subscription={subscription} />
      <ExternalLink
        className="text-sm text-muted-foreground hover:text-foreground"
        href="https://www.replay.io/terms-of-use"
      >
        Terms of service and cancellation policy
      </ExternalLink>
    </div>
  );
}

function PricingDetailsPanel({
  hideAddPaymentMethodFooter = false,
  subscription,
}: {
  hideAddPaymentMethodFooter?: boolean;
  subscription: WorkspaceSubscription;
}) {
  const { refreshSubscription, setView, workspaceId } = useContext(BillingContext);

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

  const DetailRow = ({ label, value }: { label: string; value: ReactNode }) => (
    <div className="flex flex-row items-center justify-between px-4 py-3 border-b border-border last:border-b-0">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );

  return pricingDetails ? (
    <div className="flex flex-col gap-6">
      {isPlanBeta(subscription) && (
        <div
          className="rounded-lg border border-amber-500/50 bg-amber-500/10 px-4 py-3 flex flex-row items-center gap-2"
          data-test-name="Header"
        >
          <Icon className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" type="warning" />
          <div className="text-sm">
            You&apos;re currently on a beta plan offered at no cost. We&apos;ll inform you of any
            updates or changes.
          </div>
        </div>
      )}
      <div>
        <div className="text-sm font-medium mb-3">Billing summary</div>
        <div
          className="rounded-lg border border-border bg-card overflow-hidden"
          data-test-id="PricingDetailsTable"
        >
          <DetailRow
            label={effectiveUntilLabel}
            value={
              subscription?.effectiveUntil ? format(subscription.effectiveUntil, "MMM d, y") : "—"
            }
          />
          <DetailRow
            label="Renewal schedule"
            value={
              pricingDetails?.billingSchedule
                ? pricingDetails.billingSchedule.charAt(0).toUpperCase() +
                  pricingDetails.billingSchedule.slice(1)
                : "Monthly"
            }
          />
          {isPlanPricingPerSeat(subscription) && (
            <>
              <DetailRow label="Number of seats" value={subscription.seatCount} />
              <DetailRow
                label="Cost per seat"
                value={
                  pricingDetails?.seatPrice != null ? formatCurrency(pricingDetails.seatPrice) : "—"
                }
              />
            </>
          )}
          <DetailRow
            label="Monthly charge"
            value={formatCurrency(calculateMonthlyCost(subscription, pricingDetails))}
          />
          {paymentMethod && (
            <div className="flex flex-row items-center justify-between px-4 py-3">
              <div className="text-sm text-muted-foreground">Payment method</div>
              <button
                className="text-sm font-medium text-primary hover:underline"
                data-test-id="RemovePaymentMethodButton"
                onClick={showConfirmationDialog}
              >
                {cardToDisplayName(paymentMethod.card.brand)} •••• {paymentMethod.card.last4}
              </button>
              {confirmationDialog}
            </div>
          )}
        </div>
      </div>
      {!paymentMethod && !hideAddPaymentMethodFooter && (
        <Button data-test-id="AddPaymentMethodButton" onClick={() => setView("add-payment-method")}>
          Add payment method
        </Button>
      )}
    </div>
  ) : (
    <div className="flex flex-col p-6 rounded-lg border border-border bg-card">
      <LoadingSpinner />
    </div>
  );
}
