import { ApolloError } from "@apollo/client";

export type MockGraphQLResponse<Type> =
  | {
      data: Type;
    }
  | { error: ApolloError };

export type MockGraphQLData = {
  [queryName: string]:
    | {
        data: any;
      }
    | { error: ApolloError };
};
