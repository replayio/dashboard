import { URLS } from "@/constants";

export async function fulfillAuthRequest(id: string, token: string) {
  const resp = await fetch(`${URLS.api}/v1/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation FulfillAuthRequest($secret: String!, $id: String!, $token: String!) {
          fulfillAuthRequest(input: {secret: $secret, id: $id, token: $token}) {
            success
            source
          }
        }
      `,
      variables: {
        secret: process.env.FRONTEND_API_SECRET!,
        id,
        token,
      },
    }),
  });

  const json = await resp.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  if (!json.data.fulfillAuthRequest.success) {
    throw new Error("Failed to fulfill authentication request");
  }

  return json.data.fulfillAuthRequest.source;
}
