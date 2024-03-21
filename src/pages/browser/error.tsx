import { Button } from "@/components/Button";
import { EmptyLayout } from "@/components/EmptyLayout";
import { ReplayLogo } from "@/components/ReplayLogo";
import { Hoverboard } from "@replayio/overboard";
import assert from "assert";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/navigation";

export default function Page({
  message,
  type,
  url,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  if (message === "Unexpected identity provider") {
    message =
      "We received an unexpected authentication source. Did you mean to use an Enterprise SSO? Please try signing in again from the Replay browser.";
  }

  const onClick = () => {
    if (url) {
      router.push(url);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-2 pb-6 items-center bg-white text-black rounded-lg">
        <div className="w-96 h-48 flex flex-col p-2 items-center justify-center rounded-md bg-emerald-300 relative">
          <ReplayLogo className="!text-white absolute top-4 left-4" />
          <div className="w-36 h-36">
            <Hoverboard />
          </div>
        </div>
        <div className="text-lg">
          {type === "auth" ? "Unable to Sign In" : "Unexpected recording error"}
        </div>
        <div>{message || "Please try again"}</div>
        {url && <Button onClick={onClick}>Try again</Button>}
      </div>
      {type === "auth" && (
        // Silently log the user out so they can restart authentication flow cleanly
        <iframe src="/api/auth/logout" style={{ height: 0, width: 0 }} />
      )}
    </>
  );
}

Page.Layout = EmptyLayout;

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext<{
  message?: string;
  type?: string;
  url?: string;
}>) {
  const { message, type, url } = query;

  assert(!Array.isArray(message));
  assert(!Array.isArray(type));
  assert(!Array.isArray(url));

  return {
    props: {
      message: message ?? null,
      type: type ?? null,
      url: url ?? null,
    },
  };
}
