import { Button } from "@/components/Button";
import { ExternalLink } from "@/components/ExternalLink";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { WorkspaceSubscription } from "@/graphql/types";
import { formatCurrency } from "@/utils/number";
import { pricingDetailsForSubscription } from "@/utils/subscription";
import { format } from "date-fns/format";

export function PricingDetails({
  subscription,
}: {
  subscription: WorkspaceSubscription;
}) {
  const pricingDetails = subscription
    ? pricingDetailsForSubscription(subscription)
    : null;

  return (
    <div className="flex flex-col gap-2">
      <div>
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
            <div>{pricingDetails?.billingSchedule ?? "monthly"}</div>
          </div>
          <div className="flex flex-row items-center px-2 py-1 bg-slate-900">
            <div className="grow">Number of seats</div>
            <div></div>
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
            <div></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col px-2 py-1 rounded bg-slate-900 text-sm">
          <LoadingSpinner />
        </div>
      )}
      <div>
        <Button>Add payment method</Button>
      </div>
      <div>
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
