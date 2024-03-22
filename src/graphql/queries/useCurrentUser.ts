import { GetUserQuery } from "@/graphql/generated/graphql";
import { User } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import assert from "assert";
import { useMemo } from "react";

export function useCurrentUser() {
  const { data, error, isLoading } = useGraphQLQuery<GetUserQuery>(
    gql`
      query GetUser {
        viewer {
          email
          internal
          nags
          user {
            name
            picture
            id
          }
        }
      }
    `
  );

  const user = useMemo<User | null>(() => {
    if (isLoading || error) {
      return null;
    }

    assert(data?.viewer?.user, "User could not be loaded");

    return {
      email: data.viewer.email,
      id: data.viewer.user.id,
      isInternal: data.viewer.internal,
      nags: data.viewer.nags,
      name: data.viewer.user.name ?? "",
      picture: data.viewer.user.picture ?? "",
    };
  }, [data, error, isLoading]);

  return { error, isLoading, user };
}
