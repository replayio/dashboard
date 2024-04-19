import { GetUserQuery } from "@/graphql/generated/graphql";
import { User } from "@/graphql/types";
import { DeepPartial } from "@apollo/client/utilities";
import { DEFAULT_USER_ID } from "../constants";

export function mockGetUser(partialUser: DeepPartial<User> = {}): GetUserQuery {
  return {
    viewer: {
      email: partialUser.email ?? "fake@email.com",
      internal: partialUser.isInternal == true,
      nags: (partialUser.nags ?? []) as string[],
      user: {
        name: partialUser.name ?? "Brian Vaughn",
        picture: partialUser.picture,
        id: partialUser.id ?? DEFAULT_USER_ID,
      },
    },
  };
}
