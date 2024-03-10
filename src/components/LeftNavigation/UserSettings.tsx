"use client";

import { ExternalLink } from "@/components/ExternalLink";
import { SettingsDialog } from "@/components/SettingsDialog";
import { User } from "@/graphql/types";

export function UserSettings({
  onDismiss,
  user,
}: {
  onDismiss: () => void;
  user: User;
}) {
  return (
    <SettingsDialog
      defaultPanel="account"
      onDismiss={onDismiss}
      panels={{
        account: {
          children: <Account />,
          icon: "account",
          label: "Account",
        },
        support: {
          children: <Support />,
          icon: "support",
          label: "Support",
        },
        legal: {
          children: <Legal />,
          icon: "legal",
          label: "Legal",
        },
      }}
      title="Settings"
    />
  );
}

function Account() {
  return <div>Accounts settings not yet implemented...</div>;
}

function Legal() {
  return (
    <div className="flex flex-col gap-2">
      <ExternalLink
        className="text-lg font-bold"
        href="https://www.replay.io/terms-of-service"
      >
        Terms of Use
      </ExternalLink>
      <div>
        The Terms of Use help define Replay&apos;s relationship with you as you
        interact with our services.
      </div>
      <ExternalLink
        className="text-lg font-bold"
        href="https://www.replay.io/privacy-policy"
      >
        Privacy Policy
      </ExternalLink>
      <div>
        Our Privacy Policy outlines how you can update, manage, and delete your
        information.
      </div>
    </div>
  );
}

function Support() {
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
