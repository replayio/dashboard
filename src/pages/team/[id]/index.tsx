import { getServerSidePropsHelpers as getServerSidePropsShared } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import { redirectWithState } from "@/utils/redirectWithState";
import { GetServerSidePropsContext } from "next";

export default function Page() {
  return null;
}

export async function getServerSideProps(context: GetServerSidePropsContext<any>) {
  const { invalidWorkspace, isTest, workspaceId } = await getServerSidePropsShared(context);

  if (invalidWorkspace) {
    return redirectWithState({
      context,
      pathname: "/team/me/recordings",
      props: {
        workspaceId,
      },
    });
  }
  return redirectWithState({
    context,
    pathname: isTest ? `/team/${workspaceId}/runs` : `/team/${workspaceId}/recordings`,
    props: {
      workspaceId,
    },
  });
}
