import { ExternalLink } from "@/components/ExternalLink";

export function Legal() {
  return (
    <div className="flex flex-col gap-2">
      <ExternalLink className="text-lg font-bold" href="https://www.replay.io/terms-of-service">
        Terms of Use
      </ExternalLink>
      <div>
        The Terms of Use help define Replay&apos;s relationship with you as you interact with our
        services.
      </div>
      <ExternalLink className="text-lg font-bold" href="https://www.replay.io/privacy-policy">
        Privacy Policy
      </ExternalLink>
      <div>
        Our Privacy Policy outlines how you can update, manage, and delete your information.
      </div>
    </div>
  );
}
