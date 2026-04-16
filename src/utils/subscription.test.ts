import { describe, it, expect } from "@jest/globals";
import {
  calculateMonthlyCost,
  cardToDisplayName,
  isTrialSubscription,
  inUnpaidFreeTrial,
  pricingDetailsForSubscription,
} from "@/utils/subscription";
import { PlanPricing, Workspace, WorkspaceSubscription } from "@/graphql/types";

function makeSub(overrides: Partial<WorkspaceSubscription> = {}): WorkspaceSubscription {
  return {
    effectiveFrom: new Date(),
    effectiveUntil: new Date(),
    id: "sub-1",
    paymentMethods: [],
    plan: { id: "p1", key: "team-v1", name: "Team" },
    seatCount: 5,
    status: "active",
    trialEnds: new Date(),
    ...overrides,
  };
}

function makeWorkspace(overrides: Partial<Workspace> = {}): Workspace {
  return {
    hasPaymentMethod: false,
    id: "ws-1",
    invitationCode: null,
    isOrganization: false,
    isTest: false,
    name: "Test",
    retentionLimitDays: null,
    settings: null,
    subscriptionPlanKey: "team-v1",
    ...overrides,
  };
}

describe("calculateMonthlyCost", () => {
  it("should calculate monthly cost for monthly billing", () => {
    const pricing: PlanPricing = {
      billingSchedule: "monthly",
      displayName: "Team",
      seatPrice: 20,
      discount: 0,
      trial: false,
    };
    expect(calculateMonthlyCost(makeSub({ seatCount: 3 }), pricing)).toBe(60);
  });

  it("should calculate annual cost with discount", () => {
    const pricing: PlanPricing = {
      billingSchedule: "annual",
      displayName: "Team",
      seatPrice: 20,
      discount: 0.1,
      trial: false,
    };
    // 20 * 3 * 12 = 720, then 720 * 0.9 = 648
    expect(calculateMonthlyCost(makeSub({ seatCount: 3 }), pricing)).toBe(648);
  });

  it("should return 0 when billingSchedule or seatCount is null", () => {
    const pricing: PlanPricing = {
      billingSchedule: null,
      displayName: "Beta",
      seatPrice: 0,
      discount: 0,
      trial: false,
    };
    expect(calculateMonthlyCost(makeSub(), pricing)).toBe(0);
  });
});

describe("cardToDisplayName", () => {
  it("should return display names for known card types", () => {
    expect(cardToDisplayName("visa")).toBe("Visa");
    expect(cardToDisplayName("amex")).toBe("American Express");
    expect(cardToDisplayName("mastercard")).toBe("Mastercard");
    expect(cardToDisplayName("diners")).toBe("Diners Club");
    expect(cardToDisplayName("jcb")).toBe("JCB");
  });

  it("should return 'Card' for unknown types", () => {
    expect(cardToDisplayName("unknown")).toBe("Card");
    expect(cardToDisplayName("")).toBe("Card");
  });
});

describe("isTrialSubscription", () => {
  it("should return true for trialing with no payment methods", () => {
    expect(isTrialSubscription(makeSub({ status: "trialing", paymentMethods: [] }))).toBe(true);
  });

  it("should return false for trialing with payment methods", () => {
    const pm = [
      { id: "pm1", default: true, type: "card" as const, card: { brand: "visa", last4: "4242" } },
    ];
    expect(isTrialSubscription(makeSub({ status: "trialing", paymentMethods: pm }))).toBe(false);
  });

  it("should return false for active subscriptions", () => {
    expect(isTrialSubscription(makeSub({ status: "active", paymentMethods: [] }))).toBe(false);
  });
});

describe("inUnpaidFreeTrial", () => {
  it("should return true for trialing without payment method", () => {
    expect(
      inUnpaidFreeTrial(makeWorkspace({ hasPaymentMethod: false }), makeSub({ status: "trialing" }))
    ).toBe(true);
  });

  it("should return false for trialing with payment method", () => {
    expect(
      inUnpaidFreeTrial(makeWorkspace({ hasPaymentMethod: true }), makeSub({ status: "trialing" }))
    ).toBe(false);
  });

  it("should return false for active subscriptions", () => {
    expect(
      inUnpaidFreeTrial(makeWorkspace({ hasPaymentMethod: false }), makeSub({ status: "active" }))
    ).toBe(false);
  });
});

describe("pricingDetailsForSubscription", () => {
  it("should return correct pricing for team-v1", () => {
    const result = pricingDetailsForSubscription(makeSub());
    expect(result).toMatchObject({
      billingSchedule: "monthly",
      displayName: "Team",
      seatPrice: 20,
      discount: 0,
    });
  });

  it("should return correct pricing for org-v1", () => {
    const result = pricingDetailsForSubscription(
      makeSub({ plan: { id: "p1", key: "org-v1", name: "Org" } })
    );
    expect(result).toMatchObject({ seatPrice: 75, displayName: "Organization" });
  });

  it("should return annual discount for team-annual-v1", () => {
    const result = pricingDetailsForSubscription(
      makeSub({ plan: { id: "p1", key: "team-annual-v1", name: "Team Annual" } })
    );
    expect(result).toMatchObject({ billingSchedule: "annual", discount: 0.1 });
  });

  it("should return zero seat price for testsuites-v1", () => {
    const result = pricingDetailsForSubscription(
      makeSub({ plan: { id: "p1", key: "testsuites-v1", name: "Test Suites" } })
    );
    expect(result).toMatchObject({ seatPrice: 0, displayName: "Test Suites" });
  });

  it("should return contract billing for enterprise", () => {
    const result = pricingDetailsForSubscription(
      makeSub({ plan: { id: "p1", key: "ent-v1", name: "Enterprise" } })
    );
    expect(result).toMatchObject({ billingSchedule: "contract", displayName: "Enterprise" });
  });
});
