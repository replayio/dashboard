import { COOKIES } from "@/constants";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSideProps as getServerSidePropsShared } from "@/routes/team/id/getServerSideProps";
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
  const { req } = context;
  const { props } = await getServerSidePropsShared(context);

  const stringValue = req.cookies[COOKIES.testsFilters];
  const filters = stringValue ? JSON.parse(stringValue) : null;

  return {
    props: {
      ...props,
      filters,
    },
  };
}
