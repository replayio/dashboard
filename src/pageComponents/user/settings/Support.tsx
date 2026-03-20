import { ExternalLink } from "@/components/ExternalLink";

export function Support() {
  return (
    <div className="flex flex-col gap-0">
      <div className="py-4 border-b border-border">
        <div className="text-sm font-medium mb-1">Join us on Discord</div>
        <div className="text-sm text-muted-foreground">
          Come chat with us on our{" "}
          <ExternalLink
            className="font-medium text-foreground hover:underline"
            href="https://discord.com/invite/n2dTK6kcRX"
          >
            Discord server
          </ExternalLink>
          .
        </div>
      </div>
      <div className="py-4 border-b border-border">
        <div className="text-sm font-medium mb-1">Send us an email</div>
        <div className="text-sm text-muted-foreground">
          You can also send an email at{" "}
          <a
            className="font-medium text-foreground hover:underline"
            href="mailto:support@replay.io"
          >
            support@replay.io
          </a>
          . It goes straight to the people making the product, and we&apos;d love to hear your
          feedback!
        </div>
      </div>
    </div>
  );
}
