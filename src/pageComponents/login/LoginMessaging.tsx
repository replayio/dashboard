import { ExternalLink } from "@/components/ExternalLink";
import { ReplayLogo } from "@/components/ReplayLogo";

export function LoginMessaging() {
  return (
    <>
      <ReplayLogo className="min-w-12 min-h-12" color="#F02D5E" />
      <div className="flex flex-col gap-1 items-center">
        <h2 className="text-2xl font-bold text-login-fg my-0">Welcome Back</h2>
        <p className="text-login-fg-secondary text-sm mb-0">
          Sign in to continue to{" "}
          <ExternalLink
            className="text-login-fg font-medium no-underline hover:underline"
            href="https://www.replay.io"
          >
            Replay
          </ExternalLink>
        </p>
      </div>
    </>
  );
}
