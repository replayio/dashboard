import { EmptyLayout } from "@/components/EmptyLayout";
import { ExternalLink } from "@/components/ExternalLink";
import { HEADERS } from "@/constants";
import { useCurrentUser } from "@/graphql/queries/useCurrentUser";
import { Hoverboard } from "@replayio/overboard";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Page({
  userAgent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const isWindows = userAgent.includes("Windows");

  const { user } = useCurrentUser();

  return (
    <div className="flex flex-col gap-4 items-center text-center">
      <div className="w-36 h-36">
        <Hoverboard />
      </div>
      {isWindows ? (
        <>
          <div className="font-bold">Replay on Windows is in beta</div>
          <div className="text-sm">
            We are hoping to release a new Chrome-based browser in a couple of
            months which will be more reliable. Please{" "}
            <ExternalLink href="https://www.replay.io/contact">
              contact us
            </ExternalLink>{" "}
            with any feedback.
          </div>
        </>
      ) : (
        <div>
          Please navigate to the page you want to record, then press the blue
          record button.
        </div>
      )}
    </div>
  );
}

Page.Layout = EmptyLayout;

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const userAgent = req?.headers?.[HEADERS.userAgent] as string;

  return {
    props: {
      userAgent,
    },
  };
}
