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
      {isWindows ? (
        <>          
          <div className="mb-3 text-2xl font-semibold text-left">Replay Firefox for Windows is experimental</div>
          <div className="text-lg text-left">
            <p>
            This browser has a 40% replaying failure rate and is in an experimental and unsupported status. When we resume working on Windows support, we&apos;ll be prioritizing Replay Chromium for Windows with the goal of releasing a performant and reliable browser. We apologize for the inconvenience and thank you for your patience. <ExternalLink href="https://docs.replay.io/time-travel-intro/what-is-time-travel">Time travel</ExternalLink> is an incredibly difficult problem to get right, but we&apos;re committed to making it universally available.
            </p>         
          </div>
        </>        
      ) : (
        <>          
          <div className="mb-3 text-2xl font-semibold text-left">Replay Firefox is no longer supported</div>
        <div className="text-lg text-left">
          <p>
          Check out our <ExternalLink href="https://docs.replay.io/quickstart">Quickstart Guide</ExternalLink> to start using Replay Chromium.
          </p>
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
