import { redirectWithState } from "@/utils/redirectWithState";
import assert from "assert";
import { GetServerSidePropsContext } from "next";

export default function Page() {
  return null;
}

export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>) {
  const { params } = context;

  assert(params?.id != null, '"id" parameter is required');

  // Team-level billing was removed (subscriptions are now managed per-user via
  // Stripe), so the settings index always lands on the Members tab.
  return redirectWithState({
    context,
    pathname: `/team/${params.id}/settings/members`,
  });
}
