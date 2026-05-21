import { Plan, PlanInterval, PlanKey, PlanTier, PlanVisibility } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import { useMemo } from "react";

type RawAvailablePlan = {
  id: string;
  key: string;
  name: string;
  tier: string;
  interval: string | null;
  visibility: string;
  displayName: string | null;
  monthlyPriceCents: number | null;
};

type GetAvailablePlansQuery = {
  availablePlans: RawAvailablePlan[] | null;
};

export const GET_AVAILABLE_PLANS = gql`
  query GetAvailablePlans {
    availablePlans {
      id
      key
      name
      tier
      interval
      visibility
      displayName
      monthlyPriceCents
    }
  }
`;

export function useAvailablePlans() {
  const { data, error, isLoading, refetch } = useGraphQLQuery<GetAvailablePlansQuery>(
    GET_AVAILABLE_PLANS
  );

  const plans = useMemo<Plan[] | undefined>(() => {
    if (!data?.availablePlans) return undefined;

    return data.availablePlans.map(p => ({
      id: p.id,
      key: p.key as PlanKey,
      name: p.name,
      tier: p.tier as PlanTier,
      interval: p.interval as PlanInterval | null,
      visibility: p.visibility as PlanVisibility,
      displayName: p.displayName,
      monthlyPriceCents: p.monthlyPriceCents,
    }));
  }, [data]);

  return { error, isLoading, plans, refetch };
}
