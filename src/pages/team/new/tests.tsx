import { EmptyLayout } from "@/components/EmptyLayout";
import { CreateTestSuitesTeam } from "@/pageComponents/team/new/tests/CreateTestSuitesTeam";
import { generateApiKey } from "@/pageComponents/team/new/tests/generateApiKey";
import { InferGetServerSidePropsType } from "next";

export default function Page({ apiKey }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <CreateTestSuitesTeam apiKey={apiKey} />;
}

Page.Layout = EmptyLayout;

export async function getServerSideProps() {
  const apiKey = generateApiKey();

  return {
    props: {
      apiKey,
    },
  };
}
