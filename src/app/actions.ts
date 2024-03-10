"use server";

import { cookies } from "next/headers";

export async function updateDefaultWorkspace(id: string) {
  cookies().set("replay:dashboard:default-workspace", id);
}
