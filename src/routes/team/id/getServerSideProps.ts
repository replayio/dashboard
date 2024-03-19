import assert from "assert";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext<{ id: string }>) {
  assert(params?.id != null, '"id" parameter is required');

  return {
    props: {
      workspaceId: params?.id,
    },
  };
}
