import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export default function Home() {
  const id = cookies().get("replay:dashboard:default-workspace")?.value ?? "me";

  redirect(`/team/${id}/recordings`, RedirectType.replace);
}
