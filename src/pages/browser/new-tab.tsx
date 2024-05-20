import { EmptyLayout } from "@/components/EmptyLayout";
import { ExternalLink } from "@/components/ExternalLink";
import { HEADERS } from "@/constants";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Page({
  userAgent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const isWindows = userAgent.includes("Windows");

  return (
    <div className="flex flex-col gap-4 p-6 mx-auto text-center bg-black rounded-lg shadow-lg w-96">
      {!isWindows ? (
        <>          
          <div className="mb-3 text-2xl font-semibold text-left">Windows is not supported</div>
          <div className="text-lg text-left">
            <p>We&apos;re working on a Chromium-based browser for Windows, because this version is currently experiencing a 40% crash rate. We apologize for the inconvenience.
              </p>
              <p>
                <ExternalLink href="https://docs.replay.io/replay-runtimes/replay-firefox">Learn more</ExternalLink></p>
          </div>
        </>
      ) : (
        <>          
        <div className="mb-3 text-2xl font-semibold text-left">Deprecated browser</div>
        <div className="text-lg text-left">
          <p>
          This browser runs on Gecko, which we no longer support. 
          </p>
          <p>We&apos;re working on a Chromium-based browser, but in the meantime our <ExternalLink href="https://docs.replay.io/quickstart">quickstart guide</ExternalLink> can help you get started with our command line tool.                   </p>
        </div>
      </>
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
