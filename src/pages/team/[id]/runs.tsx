import { COOKIES } from "@/constants";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSideWorkspaceProps } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import { ContextRoot, Filters } from "@/pageComponents/team/id/runs/TestRunsContext";
import { TestSuiteRunsPage } from "@/pageComponents/team/id/runs/TestSuiteRunsPage";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Page({
  filters,
  retentionLimit,
  testId,
  testRunId,
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useSyncDefaultWorkspace();

  return (
    <ContextRoot
      defaultTestId={testId}
      defaultTestRunId={testRunId}
      filters={filters!}
      retentionLimit={retentionLimit}
      workspaceId={workspaceId!}
    >
      <TestSuiteRunsPage />
    </ContextRoot>
  );
}

Page.Layout = TeamLayout;

export async function getServerSideProps(context: GetServerSidePropsContext<any>) {
  const stringValue = context.req.cookies[COOKIES.testRunsFilters];
  const filters = stringValue ? (JSON.parse(stringValue) as Partial<Filters>) : null;

  const { isInvalid, isTest, retentionLimit, workspaceId } =
    await getServerSideWorkspaceProps(context);

  const testId = (context.query.testId ?? null) as string | null;
  const testRunId = (context.query.testRunId ?? null) as string | null;

  if (isInvalid) {
    return redirectWithState({
      context,
      pathname: "/team/not-found",
    });
  } else if (!isTest) {
    return redirectWithState({
      context,
      pathname: `/team/${workspaceId}/recordings`,
    });
  }

  return {
    props: {
      filters,
      retentionLimit,
      testId,
      testRunId,
      workspaceId,
    },
  };
}
