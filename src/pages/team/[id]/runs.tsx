import { COOKIES, HEADERS } from "@/constants";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSidePropsHelpers as getServerSidePropsShared } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import {
  ContextRoot,
  Filters,
} from "@/pageComponents/team/id/runs/TestRunsContext";
import { TestSuiteRunsPage } from "@/pageComponents/team/id/runs/TestSuiteRunsPage";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { MockDataKey } from "../../../../tests/mocks/data";

export default function Page({
  filters,
  mockKey,
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useSyncDefaultWorkspace();

  return (
    <ContextRoot
      filters={filters!}
      mockKey={mockKey}
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

  const mockKey = (context.req?.headers?.[HEADERS.mockKey] ||
    "") as MockDataKey;

  if (invalidWorkspace) {
    return {
      redirect: {
        permanent: false,
        destination: "/team/me/recordings",
      },
      props: {
        filters,
        mockKey,
        workspaceId,
      },
    };
  } else if (!isTest) {
    return {
      redirect: {
        permanent: false,
        destination: `/team/${workspaceId}/recordings`,
      },
      props: {
        filters,
        mockKey,
        workspaceId,
      },
    };
  }

  return {
    props: {
      filters,
      mockKey,
      workspaceId,
    },
  };
}
