import { ExternalLink } from "@/components/ExternalLink";
import { ReplayLogo } from "@/components/ReplayLogo";
import { ReactNode } from "react";

type LoginMessagingProps = {
  title?: string;
  subtitle?: ReactNode;
};

export function LoginMessaging({ title = "Welcome Back", subtitle }: LoginMessagingProps = {}) {
  const defaultSubtitle = (
    <p className="text-login-fg-secondary text-sm mb-0">
      Sign in to continue to{" "}
      <ExternalLink
        className="text-login-fg font-medium no-underline hover:underline"
        href="https://www.replay.io"
      >
        Replay
      </ExternalLink>
    </p>
  );

  return (
    <>
      <ReplayLogo className="h-12 w-12 shrink-0" color="#F02D5E" />
      <div className="flex flex-col gap-2 items-center text-center">
        <h2 className="text-2xl font-bold text-login-fg my-0">{title}</h2>
        {subtitle ?? defaultSubtitle}
      </div>
    </>
  );
}
