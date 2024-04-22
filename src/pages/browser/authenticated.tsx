import { Button } from "@/components/Button";
import { EmptyLayout } from "@/components/EmptyLayout";
import { Message } from "@/components/Message";
import { ReplayLogo } from "@/components/ReplayLogo";
import { HEADERS } from "@/constants";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function Page({
  userAgent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const searchParams = useSearchParams();
  const source = searchParams?.get("source");
  const isMacOS = userAgent.includes("Macintosh");

  if (source === "browser") {
    return (
      <Message className="max-w-96 p-8 gap-8 text-center">
        <ReplayLogo className="text-white min-w-20 min-h-20" />
        <div>
          You have successfully logged in. You may close this window.
        </div>
        {isMacOS && (
          <Button onClick={() => window.location.href = "replay:open"} size="large">
            Open Replay
          </Button>
        )}
      </Message>
    );
  } else {
    return (
      <Message className="max-w-96 p-8 gap-8 text-center">
        <ReplayLogo className="text-white min-w-20 min-h-20" />
        <div className="font-bold text-xl">
          Authentication Complete
        </div>
        <div>
          You have successfully logged in. You may close this window.
        </div>
      </Message>
    );
  }
};

Page.Layout = EmptyLayout;

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const userAgent = req?.headers?.[HEADERS.userAgent] as string;

  return {
    props: {
      userAgent,
    },
  };
}
