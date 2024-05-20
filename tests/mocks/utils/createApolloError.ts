import { ApolloError } from "@apollo/client";

export function createApolloError(message: string): ApolloError {
  return { message } as any as ApolloError;
}
