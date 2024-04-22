import { COOKIES } from "@/constants";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSidePropsHelpers as getServerSidePropsShared } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import { TestSuiteTestsPage } from "@/pageComponents/team/id/tests/TestSuiteTestsPage";
import {
  ContextRoot,
  Filters,
} from "@/pageComponents/team/id/tests/TestsViewContext";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Page({
  filters,
  testSummaryId,
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useSyncDefaultWorkspace();

  return (
    <ContextRoot
      defaultTestSummaryId={testSummaryId}
      filters={filters}
      workspaceId={workspaceId}
    >
      <TestSuiteTestsPage workspaceId={workspaceId!} />
    </ContextRoot>
  );
}

Page.Layout = TeamLayout;

export async function getServerSideProps(
  context: GetServerSidePropsContext<any>
) {
  const stringValue = context.req.cookies[COOKIES.testsFilters];
  const filters = stringValue
    ? (JSON.parse(stringValue) as Partial<Filters>)
    : null;

  const { invalidWorkspace, isTest, workspaceId } =
    await getServerSidePropsShared(context);

  const testSummaryId = (context.query.testSummaryId ?? null) as string | null;

  if (invalidWorkspace) {
    return redirectWithState({
      context,
      pathname: "/team/me/recordings",
      props: {
        filters,
        testSummaryId,
        workspaceId,
      },
    });
  } else if (!isTest) {
    return redirectWithState({
      context,
      pathname: `/team/${workspaceId}/recordings`,
      props: {
        filters,
        testSummaryId,
        workspaceId,
      },
    });
  }

  return {
    props: {
      filters,
      testSummaryId,
      workspaceId,
    },
  };
}
