import { GetWorkspacesQuery } from "@/graphql/generated/graphql";
import { Workspace } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import { useMemo } from "react";

export const QUERY = gql`
  query GetWorkspaces {
    viewer {
      workspaces {
        edges {
          node {
            hasPaymentMethod
            id
            invitationCode
            isOrganization
            isTest
            name
            retentionLimit
            settings {
              features
            }
            subscription {
              id
              plan {
                id
                key
              }
            }
          }
        }
      }
    }
  }
`;

export function useWorkspaces() {
  const { data, error, isLoading, refetch } = useGraphQLQuery<GetWorkspacesQuery>(QUERY);

  const workspaces = useMemo<Workspace[] | undefined>(() => {
    if (data) {
      return (
        data.viewer?.workspaces.edges.map(({ node }) => {
          return {
            hasPaymentMethod: node.hasPaymentMethod,
            id: node.id,
            invitationCode: node.invitationCode ?? null,
            isOrganization: node.isOrganization,
            isTest: node.isTest,
            name: node.name,
            retentionLimitDays: node.retentionLimit ?? null,
            settings: node.settings
              ? {
                  features: {
                    recording: {
                      allowList: node.settings.features?.recording?.allowList ?? [],
                      blockList: node.settings.features?.recording?.blockList ?? [],
                      public: node.settings.features?.recording?.public == true,
                    },
                    user: {
                      autoJoin: node.settings.features?.user?.autoJoin ?? 0,
                    },
                  },
                }
              : null,
            subscriptionPlanKey: node.subscription?.plan?.key ?? null,
          };
        }) ?? []
      );
    }
  }, [data]);

  return { error, isLoading, refetch, workspaces };
}
