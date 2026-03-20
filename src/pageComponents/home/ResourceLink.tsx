import { Icon, IconType } from "@/components/Icon";
import { ExternalLink } from "@/components/ExternalLink";
import Link from "next/link";
import { PropsWithChildren } from "react";

export function ResourceLink({
  children,
  href,
  iconType,
  title,
}: PropsWithChildren<{ href: string; iconType: IconType; title: string }>) {
  const Component = href.startsWith("/") || href.startsWith("mailto:") ? Link : ExternalLink;

  return (
    <Component
      className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-ring hover:bg-accent/50 hover:shadow-sm"
      href={href}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
        <Icon className="h-6 w-6" type={iconType} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-base font-semibold text-foreground">{title}</div>
        <div className="mt-0.5 text-sm text-muted-foreground">{children}</div>
      </div>
      <Icon
        className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        type="external-link"
      />
    </Component>
  );
}
