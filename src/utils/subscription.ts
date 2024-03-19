import { PlanPricing, WorkspaceSubscription } from "@/graphql/types";
import assert from "assert";

export function cardToDisplayName(type: string) {
  switch (type) {
    case "visa":
      return "Visa";
    case "amex":
      return "American Express";
    case "diners":
      return "Diners Club";
    case "jcb":
      return "JCB";
    case "mastercard":
      return "Mastercard";
    default:
      return "Card";
  }
}

export function isTrialSubscription(subscription: WorkspaceSubscription) {
  return (
    subscription.status === "trialing" &&
    subscription.paymentMethods != null &&
    subscription.paymentMethods.length === 0
  );
}

export function pricingDetailsForSubscription(
  subscription: WorkspaceSubscription
): PlanPricing {
  assert(subscription.plan?.key, "Workspace does not have a planKey");

  switch (subscription.plan.key) {
    case "beta-v1":
    case "test-beta-v1":
      return {
        billingSchedule: null,
        displayName: "Beta Tester Appreciation",
        seatPrice: 0,
        discount: 0,
        trial: isTrialSubscription(subscription),
      };
    case "team-oss-v1":
      return {
        billingSchedule: "monthly",
        displayName: "OSS Team",
        seatPrice: 0,
        discount: 0,
        trial: false,
      };
    case "team-internal-v1":
      return {
        billingSchedule: "monthly",
        displayName: "Replay Team",
        seatPrice: 0,
        discount: 0,
        trial: false,
      };
    case "team-v1":
    case "test-team-v1":
      return {
        billingSchedule: "monthly",
        displayName: "Team",
        seatPrice: 20,
        discount: 0,
        trial: isTrialSubscription(subscription),
      };
    case "team-annual-v1":
      return {
        billingSchedule: "annual",
        displayName: "Team",
        seatPrice: 20,
        discount: 0.1,
        trial: isTrialSubscription(subscription),
      };
    case "org-v1":
      return {
        billingSchedule: "monthly",
        displayName: "Organization",
        seatPrice: 75,
        discount: 0,
        trial: isTrialSubscription(subscription),
      };
    case "org-annual-v1":
      return {
        billingSchedule: "annual",
        displayName: "Organization",
        seatPrice: 75,
        discount: 0.1,
        trial: isTrialSubscription(subscription),
      };
    case "org-annual-contract-v1":
      return {
        billingSchedule: "contract",
        displayName: "Organization",
        seatPrice: 0,
        discount: 0,
        trial: false,
      };
    case "ent-v1":
      return {
        billingSchedule: "contract",
        displayName: "Enterprise",
        seatPrice: 0,
        discount: 0,
        trial: false,
      };
  }
}
