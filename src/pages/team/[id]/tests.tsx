import { COOKIES } from "@/constants";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSidePropsHelpers as getServerSidePropsShared } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import { TestSuiteTestsPage } from "@/pageComponents/team/id/tests/TestSuiteTestsPage";
import {
  ContextRoot,
  Filters,
} from "@/pageComponents/team/id/tests/TestsViewContext";
import { GetServerSidePropsContext } from "next";

export default function Page({
  filters,
  workspaceId,
}: {
  filters: Partial<Filters> | null;
  workspaceId: string;
}) {
  useSyncDefaultWorkspace();

  return (
    <ContextRoot filters={filters} workspaceId={workspaceId}>
      <TestSuiteTestsPage workspaceId={workspaceId} />
    </ContextRoot>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<any>
) {
  const { isTest, workspaceId } = await getServerSidePropsShared(context);
  if (!isTest) {
    return {
      redirect: {
        permanent: false,
        destination: `/team/${workspaceId}/recordings`,
      },
      props: {},
    };
  }

  const stringValue = context.req.cookies[COOKIES.testsFilters];
  const filters = stringValue ? JSON.parse(stringValue) : null;

  return {
    props: {
      filters,
      workspaceId,
    },
  };
}
