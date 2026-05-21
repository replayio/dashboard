import { BILLING_V2_PICKER_ENABLED, HEADERS } from "@/constants";
import { getWorkspaceHasSubscription } from "@/graphql/queries/getWorkspaceHasSubscription";
import { PlanKey } from "@/graphql/types";
import { useWorkspaceSubscription } from "@/graphql/queries/useWorkspaceSubscription";
import { getServerSideWorkspaceProps } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import { PlanPicker } from "@/pageComponents/team/id/plans/PlanPicker";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { decompress } from "@/utils/compression";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { MockGraphQLData } from "@/testing/mockGraphQLTypes";

const CHECKOUT_POLL_TIMEOUT_MS = 30_000;

export default function Page({
  initialPlanKey,
  initialPlanName,
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const checkoutStatus = getValueFromArrayOrString(router.query.checkout);

  const { subscription, refetch } = useWorkspaceSubscription(workspaceId);
  const [pollingForCheckout, setPollingForCheckout] = useState(
    checkoutStatus === "success"
  );

  const currentPlanKey: PlanKey | null = useMemo(() => {
    return (subscription?.plan?.key as PlanKey | undefined) ?? initialPlanKey ?? null;
  }, [subscription, initialPlanKey]);

  const currentPlanName: string | null =
    subscription?.plan?.name ?? initialPlanName ?? null;

  // Stripe Checkout success flow: webhook reconciles plan_id asynchronously,
  // so poll the subscription query until it settles or we time out.
  useEffect(() => {
    if (!pollingForCheckout) return;
    const start = Date.now();
    const interval = setInterval(async () => {
      try {
        await refetch();
      } catch {
        // ignore; keep polling
      }
      if (Date.now() - start > CHECKOUT_POLL_TIMEOUT_MS) {
        clearInterval(interval);
        setPollingForCheckout(false);
      }
    }, 2_000);
    return () => clearInterval(interval);
  }, [pollingForCheckout, refetch]);

  // Once we detect a non-pending v2 subscription after Checkout success,
  // send the user into the app.
  useEffect(() => {
    if (!pollingForCheckout) return;
    if (
      subscription?.plan?.key === "growth-monthly-v1" ||
      subscription?.plan?.key === "growth-annual-v1"
    ) {
      setPollingForCheckout(false);
      router.replace(`/team/${workspaceId}/recordings`);
    }
  }, [pollingForCheckout, subscription, router, workspaceId]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 p-6 lg:p-12">
      {checkoutStatus === "success" && pollingForCheckout && (
        <div className="rounded-md border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
          Activating your subscription… this usually takes a few seconds.
        </div>
      )}
      {checkoutStatus === "cancelled" && (
        <div className="rounded-md border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
          Checkout was cancelled. Your account has not been charged.
        </div>
      )}

      <PlanPicker
        workspaceId={workspaceId}
        currentPlanKey={currentPlanKey}
        currentPlanName={currentPlanName}
      />
    </div>
  );
}

Page.Layout = TeamLayout;

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  if (!BILLING_V2_PICKER_ENABLED) {
    return {
      notFound: true,
    };
  }

  const { isInvalid, workspaceId } = await getServerSideWorkspaceProps(context);

  if (isInvalid) {
    return redirectWithState({
      context,
      pathname: `/team/${workspaceId}/not-found`,
    });
  }

  const { req } = context;
  const accessToken = getValueFromArrayOrString(req?.headers?.[HEADERS.accessToken]);
  if (!accessToken) {
    return redirectWithState({ context, pathname: `/team/${workspaceId}/recordings` });
  }

  const mockGraphQLDataString = getValueFromArrayOrString(
    req?.headers?.[HEADERS.mockGraphQLData]
  );
  const mockGraphQLData = mockGraphQLDataString
    ? decompress<MockGraphQLData>(mockGraphQLDataString)
    : null;

  const { planKey } = await getWorkspaceHasSubscription(
    workspaceId,
    accessToken,
    mockGraphQLData
  );

  return {
    props: {
      workspaceId,
      initialPlanKey: (planKey as PlanKey | null) ?? null,
      initialPlanName: null,
    },
  };
}
