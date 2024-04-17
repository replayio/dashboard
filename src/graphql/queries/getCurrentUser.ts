import { User } from "@/graphql/types";
import { URLS } from "@/constants";

export async function getCurrentUser(accessToken: string) {
  const resp = await fetch(`${URLS.api}/v1/graphql`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
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
      `,
    }),
  });

  const json: any = await resp.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data.viewer ? convertUser(json.data.viewer) : null;
}

// TODO [PRO-44] add types for the GetUser query
function convertUser(viewer: any): User {
  return {
    email: viewer.email,
    id: viewer.user.id,
    isInternal: viewer.internal,
    nags: viewer.nags,
    name: viewer.user.name ?? "",
    picture: viewer.user.picture ?? "",
  };
}