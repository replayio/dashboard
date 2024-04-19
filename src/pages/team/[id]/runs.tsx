import { COOKIES } from "@/constants";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSidePropsHelpers as getServerSidePropsShared } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import {
  ContextRoot,
  Filters,
} from "@/pageComponents/team/id/runs/TestRunsContext";
import { TestSuiteRunsPage } from "@/pageComponents/team/id/runs/TestSuiteRunsPage";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Page({
  filters,
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
      workspaceId={workspaceId!}
    >
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

  const { invalidWorkspace, isTest, workspaceId } =
    await getServerSidePropsShared(context);

  const testId = (context.query.testId ?? null) as string | null;
  const testRunId = (context.query.testRunId ?? null) as string | null;

  if (invalidWorkspace) {
    return redirectWithState({
      context,
      pathname: "/team/me/recordings",
      props: {
        filters,
        testId,
        testRunId,
        workspaceId,
      },
    });
  } else if (!isTest) {
    return redirectWithState({
      context,
      pathname: `/team/${workspaceId}/recordings`,
      props: {
        filters,
        testId,
        testRunId,
        workspaceId,
      },
    });
  }

  return {
    props: {
      filters,
      testId,
      testRunId,
      workspaceId,
    },
  };
}
