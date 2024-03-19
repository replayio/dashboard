import { Button } from "@/components/Button";
import { WorkspaceSubscription } from "@/graphql/types";
import { differenceInCalendarDays } from "date-fns/differenceInCalendarDays";

export function TrialDetails({
  showTeamPlanPricing,
  subscription,
}: {
  showTeamPlanPricing: () => void;
  subscription: WorkspaceSubscription;
}) {
  const days = subscription
    ? differenceInCalendarDays(subscription.trialEnds, new Date())
    : 0;

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
        <Button onClick={showTeamPlanPricing}>Team plan pricing</Button>
      </div>
    </div>
  );
}
