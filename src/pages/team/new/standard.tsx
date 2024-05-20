import { EmptyLayout } from "@/components/EmptyLayout";
import {
  CreateStandardTeam,
  WorkspaceType,
} from "@/pageComponents/team/new/standard/CreateStandardTeam";
import assert from "assert";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Page({ type }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <CreateStandardTeam type={type || "team"} />;
}

Page.Layout = EmptyLayout;

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext<{
  type?: string;
}>) {
  const { type } = query;

  assert(!Array.isArray(type));

  return {
    props: {
      type: (type ?? "team") as WorkspaceType,
    },
  };
}
