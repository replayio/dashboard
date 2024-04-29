import { HEADERS } from "@/constants";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import { GetServerSidePropsContext } from "next";

// Redirect responses returned from getServerSideProps() should always use this method
// to ensure that e2e tests continue to work after redirects
export function redirectWithState({
  context,
  params = {},
  pathname,
  permanent = false,
}: {
  context: GetServerSidePropsContext<any>;
  params?: { [key: string]: string };
  pathname: string;
  permanent?: boolean;
}) {
  // Mock GraphQL responses are passed to the server as query parameters and then get passed onto the client as custom headers
  // Headers are not included with a redirect, which means this data could get dropped
  // In order for server-side methods like getServerSideProps() to access the mock data after a redirect
  // we need to ensure that it gets passed along with the redirect
  const mockGraphQLDataString = getValueFromArrayOrString(
    context.req?.headers?.[HEADERS.mockGraphQLData]
  );

  const destination = `${pathname}?${new URLSearchParams({
    ...params,
    ...(mockGraphQLDataString && { mockGraphQLData: mockGraphQLDataString }),
  })}`;

  return {
    redirect: {
      destination,
      permanent,
    },
  };
}
