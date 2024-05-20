import { redirectWithState } from "@/utils/redirectWithState";
import assert from "assert";
import { GetServerSidePropsContext } from "next";

export default function Page() {
  return null;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{
    type?: string;
  }>
) {
  const { type } = context.query;

  assert(!Array.isArray(type));

  return redirectWithState({
    context,
    params: { type: type ?? "team" },
    pathname: "/team/new/standard",
  });
}
