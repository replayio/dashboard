import { COOKIES } from "@/constants";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSidePropsHelpers as getServerSidePropsShared } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import {
  ContextRoot,
  Filters,
} from "@/pageComponents/team/id/runs/TestRunsContext";
import { TestSuiteRunsPage } from "@/pageComponents/team/id/runs/TestSuiteRunsPage";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Page({
  filters,
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useSyncDefaultWorkspace();

  return (
    <ContextRoot filters={filters!} workspaceId={workspaceId!}>
      <TestSuiteRunsPage />
    </ContextRoot>
  );
}

Page.Layout = TeamLayout;

export async function getServerSideProps(
  context: GetServerSidePropsContext<any>
) {
  const stringValue = context.req.cookies[COOKIES.testRunsFilters];
  const filters = stringValue
    ? (JSON.parse(stringValue) as Partial<Filters>)
    : null;

  const { isTest, workspaceId } = await getServerSidePropsShared(context);
  if (!isTest) {
    return {
      redirect: {
        permanent: false,
        destination: `/team/${workspaceId}/recordings`,
      },
      props: {
        filters,
        workspaceId,
      },
    };
  }

  return {
    props: {
      filters,
      workspaceId,
    },
  };
}
