import { URLS } from "@/constants";

export async function initAuthRequest(key: string, source: string) {
  const resp = await fetch(`${URLS.api}/v1/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation InitAutRequest($key: String!, $source: String = "browser") {
          initAuthRequest(input: {key: $key, source: $source}) {
            id
            challenge
            serverKey
          }
        }
      `,
      variables: {
        key,
        source,
      },
    }),
  });

  const json: any = await resp.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data.initAuthRequest;
}
