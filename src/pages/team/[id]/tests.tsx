import { Button } from "@/components/Button";
import { EmptyLayout } from "@/components/EmptyLayout";
import { Message } from "@/components/Message";
import { COOKIES } from "@/constants";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSideWorkspaceProps } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import { TestSuiteTestsPage } from "@/pageComponents/team/id/tests/TestSuiteTestsPage";
import { ContextRoot, Filters } from "@/pageComponents/team/id/tests/TestsViewContext";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/navigation";

export default function Page({
  filters,
  retentionLimit,
  testSummaryId,
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useSyncDefaultWorkspace();

  // TODO [PRO-664] Re-enable Tests view once GraphQL perf issue has been resolved
  const router = useRouter();
  return (
    <Message className="m-4">
      <div>Tests view is temporarily disabled while we fix an performance issue.</div>
      <Button
        onClick={() => {
          router.push("/home");
        }}
        size="large"
      >
        Go home
      </Button>
    </Message>
  );

  // return (
  //   <ContextRoot
  //     defaultTestSummaryId={testSummaryId}
  //     filters={filters}
  //     retentionLimit={retentionLimit}
  //     workspaceId={workspaceId}
  //   >
  //     <TestSuiteTestsPage />
  //   </ContextRoot>
  // );
}

// TODO [PRO-664]
// Page.Layout = TeamLayout;
Page.Layout = EmptyLayout;

export async function getServerSideProps(context: GetServerSidePropsContext<any>) {
  const stringValue = context.req.cookies[COOKIES.testsFilters];
  const filters = stringValue ? (JSON.parse(stringValue) as Partial<Filters>) : null;

  const { isInvalid, isTest, retentionLimit, workspaceId } =
    await getServerSideWorkspaceProps(context);

  const testSummaryId = (context.query.testSummaryId ?? null) as string | null;

  if (isInvalid) {
    return redirectWithState({
      context,
      pathname: `/team/${workspaceId}/not-found`,
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
