"use server";

import { getGraphQLClientServer } from "@/graphql/graphQLClient";
import { revalidatePath } from "next/cache";

export async function revalidate() {
  revalidatePath("/", "page");

  const client = await getGraphQLClientServer();
  client.cache.reset();
}
