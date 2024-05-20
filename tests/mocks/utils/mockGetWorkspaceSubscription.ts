import { GetWorkspaceSubscriptionQuery } from "@/graphql/generated/graphql";
import { WorkspaceSubscription } from "@/graphql/types";
import { getRelativeDate } from "@/utils/date";
import { DeepPartial } from "@apollo/client/utilities";
import { MockGraphQLResponse } from "tests/mocks/types";
import { DEFAULT_WORKSPACE_ID } from "../constants";
import { getUID } from "./getUID";

export function mockGetWorkspaceSubscription(
  partialWorkspaceSubscription: DeepPartial<WorkspaceSubscription>,
  workspaceId: string = DEFAULT_WORKSPACE_ID
): MockGraphQLResponse<GetWorkspaceSubscriptionQuery> {
  return {
    data: {
      node: {
        __typename: "Workspace",
        id: workspaceId,
        subscription: {
          __typename: "WorkspaceSubscription",
          id: getUID("workspace-subscription"),
          effectiveFrom:
            partialWorkspaceSubscription.effectiveFrom ?? getRelativeDate({ daysAgo: 7 }),
          effectiveUntil:
            partialWorkspaceSubscription.effectiveUntil ?? getRelativeDate({ daysAgo: -7 }),
          status: partialWorkspaceSubscription.status ?? "trialing",
          trialEnds: partialWorkspaceSubscription.trialEnds ?? getRelativeDate({ daysAgo: -7 }),
          seatCount: partialWorkspaceSubscription.seatCount ?? 0,
          paymentMethods: partialWorkspaceSubscription.paymentMethods?.map(paymentMethod => ({
            __typename: "PaymentMethod",
            card: {
              __typename: "PaymentMethodCard",
              brand: paymentMethod?.card?.brand ?? "Visa",
              last4: paymentMethod?.card?.last4 ?? "1234",
            },
            default: paymentMethod?.default ?? true,
            id: paymentMethod?.id ?? getUID("payment-method"),
            type: paymentMethod?.type ?? "card",
          })),
          plan: {
            __typename: "Plan",
            id: partialWorkspaceSubscription.plan?.id ?? getUID("plan"),
            key: partialWorkspaceSubscription.plan?.key ?? "org-v1",
            name: partialWorkspaceSubscription.plan?.name ?? "Organization Plan",
          },
        },
      },
    },
  };
}
