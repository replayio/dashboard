import { COOKIES } from "@/constants";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSidePropsHelpers as getServerSidePropsShared } from "@/routes/team/id/getServerSidePropsHelpers";
import { TestSuiteTestsPage } from "@/routes/team/id/tests/TestSuiteTestsPage";
import { ContextRoot, Filters } from "@/routes/team/id/tests/TestsViewContext";
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
