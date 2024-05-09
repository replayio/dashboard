import { COOKIES } from "@/constants";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSideWorkspaceProps } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import { TestSuiteTestsPage } from "@/pageComponents/team/id/tests/TestSuiteTestsPage";
import { ContextRoot, State } from "@/pageComponents/team/id/tests/TestsViewContext";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Page({
  filters,
  retentionLimit,
  testSummaryId,
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useSyncDefaultWorkspace();

  return (
    <ContextRoot
      defaultTestSummaryId={testSummaryId}
      filters={filters}
      retentionLimit={retentionLimit}
      workspaceId={workspaceId}
    >
      <TestSuiteTestsPage />
    </ContextRoot>
  );
}

Page.Layout = TeamLayout;

export async function getServerSideProps(context: GetServerSidePropsContext<any>) {
  const stringValue = context.req.cookies[COOKIES.testsFilters];
  const filters = stringValue ? (JSON.parse(stringValue) as Partial<State>) : null;

  const { isInvalid, isTest, pendingWorkspace, retentionLimit, workspaceId } =
    await getServerSideWorkspaceProps(context);

  const testSummaryId = (context.query.testSummaryId ?? null) as string | null;

  if (isInvalid) {
    return redirectWithState({
      context,
      pathname: "/team/me/recordings",
    });
  } else if (pendingWorkspace) {
    return redirectWithState({
      context,
      pathname: `/team/${workspaceId}/pending`,
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
      testSummaryId,
      workspaceId,
    },
  };
}
