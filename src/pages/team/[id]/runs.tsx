import { COOKIES, HEADERS } from "@/constants";
import { getWorkspace } from "@/graphql/queries/getWorkspaceType";
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
  const { workspaceId } = props;

  const accessToken = context.req?.headers?.[HEADERS.accessToken] as string;
  const { isTest } = await getWorkspace(accessToken, workspaceId);
  if (!isTest) {
    return {
      redirect: {
        permanent: false,
        destination: `/team/${workspaceId}/recordings`,
      },
      props: {},
    };
  }

  const stringValue = req.cookies[COOKIES.testRunsFilters];
  const filters = stringValue ? JSON.parse(stringValue) : null;

  return {
    props: {
      filters,
      workspaceId,
    },
  };
}
