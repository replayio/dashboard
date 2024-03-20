import { EmptyLayout } from "@/components/EmptyLayout";
import { InvitationPage } from "@/routes/team/invitation/InvitationPage";
import assert from "assert";
import { GetServerSidePropsContext } from "next";

export default function Page({ code }: { code: string | null }) {
  return <InvitationPage code={code} />;
}

Page.Layout = EmptyLayout;

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext<{ code: string }>) {
  return {
    props: {
      code: query?.code || null,
    },
  };
}
