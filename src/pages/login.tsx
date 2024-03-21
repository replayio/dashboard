import { Button } from "@/components/Button";
import { EmptyLayout } from "@/components/EmptyLayout";
import { ExternalLink } from "@/components/ExternalLink";
import { Message } from "@/components/Message";
import { ReplayLogo } from "@/components/ReplayLogo";
import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/navigation";

export default function Page({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  if (user) {
    return (
      <Message className="max-w-96">
        <ReplayLogo className="text-white min-w-12 min-h-12" />
        <div>
          You are already logged in as <strong>{user.name}</strong>.
        </div>
        <Button onClick={() => router.push("/")}>Continue to Library</Button>
        {/* TODO [FE-2379] Support account switcher
        globalThis.__IS_RECORD_REPLAY_RUNTIME__ || (
          <Button
            onClick={() => router.push("/api/auth/login")}
            variant="outline"
          >
            Switch accounts
          </Button>
        )
        */}
      </Message>
    );
  } else {
    return (
      <Message className="max-w-96">
        <ReplayLogo className="text-white min-w-12 min-h-12" />
        <div>
          Replay captures everything you need for the perfect bug report, all in
          one link.{" "}
          <ExternalLink href="https://www.replay.io">Learn more</ExternalLink>
        </div>
        <Button onClick={() => router.push("/api/auth/login")}>
          Sign in with Google
        </Button>
      </Message>
    );
  }
}

Page.Layout = EmptyLayout;

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getSession(req, res);

  return { props: { user: session?.user ?? null } };
}
