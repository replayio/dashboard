import { getServerSideWorkspaceProps } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext } from "next";

export default function Page() {
  return null;
}

export async function getServerSideProps(context: GetServerSidePropsContext<any>) {
  const { isInvalid, isTest, pendingWorkspace, workspaceId } =
    await getServerSideWorkspaceProps(context);

  if (isInvalid) {
    return redirectWithState({
      context,
      pathname: "/team/me/recordings",
    });
  }
  if (pendingWorkspace) {
    return redirectWithState({
      context,
      pathname: `/team/${workspaceId}/pending`,
    });
  }
  return redirectWithState({
    context,
    pathname: isTest ? `/team/${workspaceId}/runs` : `/team/${workspaceId}/recordings`,
  });
}
