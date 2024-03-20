import { COOKIES } from "@/constants";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSideProps as getServerSidePropsShared } from "@/routes/team/id/getServerSideProps";
import { ContextRoot, Filters } from "@/routes/team/id/runs/TestRunsContext";
import { TestSuiteRunsPage } from "@/routes/team/id/runs/TestSuiteRunsPage";
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
      <TestSuiteRunsPage />
    </ContextRoot>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<any>
) {
  const { req } = context;
  const { props } = await getServerSidePropsShared(context);

  const stringValue = req.cookies[COOKIES.testRunsFilters];
  const filters = stringValue ? JSON.parse(stringValue) : null;

  return {
    props: {
      ...props,
      filters,
    },
  };
}
