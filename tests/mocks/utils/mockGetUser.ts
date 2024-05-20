import { GetUserQuery } from "@/graphql/generated/graphql";
import { User } from "@/graphql/types";
import { DeepPartial } from "@apollo/client/utilities";
import { MockGraphQLResponse } from "tests/mocks/types";
import { DEFAULT_USER_ID } from "../constants";

export function mockGetUser(
  partialUser: DeepPartial<User> = {}
): MockGraphQLResponse<GetUserQuery> {
  return {
    data: {
      viewer: {
        email: partialUser.email ?? "fake@email.com",
        internal: partialUser.isInternal == true,
        nags: (partialUser.nags ?? []) as string[],
        user: {
          name: partialUser.name ?? "Test User",
          picture: partialUser.picture,
          id: partialUser.id ?? DEFAULT_USER_ID,
        },
      },
    },
  };
}
