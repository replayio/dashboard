import { ExternalLink } from "@/components/ExternalLink";

export function Legal() {
  return (
    <div className="flex flex-col gap-0">
      <div className="py-4 border-b border-border">
        <ExternalLink
          className="text-sm font-medium text-foreground hover:underline"
          href="https://www.replay.io/terms-of-service"
        >
          Terms of Use
        </ExternalLink>
        <div className="text-sm text-muted-foreground mt-1">
          The Terms of Use help define Replay&apos;s relationship with you as you interact with our
          services.
        </div>
      </div>
      <div className="py-4 border-b border-border">
        <ExternalLink
          className="text-sm font-medium text-foreground hover:underline"
          href="https://www.replay.io/privacy-policy"
        >
          Privacy Policy
        </ExternalLink>
        <div className="text-sm text-muted-foreground mt-1">
          Our Privacy Policy outlines how you can update, manage, and delete your information.
        </div>
      </div>
    </div>
  );
}
