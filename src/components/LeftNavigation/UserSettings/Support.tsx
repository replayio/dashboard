"use client";

import { ExternalLink } from "@/components/ExternalLink";

export function Support() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-bold">Join us on Discord</div>
      <div>
        Come chat with us on our{" "}
        <ExternalLink href="https://discord.com/invite/n2dTK6kcRX">
          Discord server
        </ExternalLink>
        .
      </div>
      <div className="text-lg font-bold">Send us an email</div>
      <div>
        You can also send an email at{" "}
        <a href="mailto:support@replay.io">support@replay.io</a>. It goes
        straight to the people making the product, and we&apos;d love to hear
        your feedback!
      </div>
    </div>
  );
}
