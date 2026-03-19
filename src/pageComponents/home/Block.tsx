import { ExternalLink } from "@/components/ExternalLink";
import Link from "next/link";
import { PropsWithChildren } from "react";

export function Block({
  children,
  href,
  imageUrl,
  title,
}: PropsWithChildren<{ href: string; imageUrl: string; title: string }>) {
  const Component = href.startsWith("/") || href.startsWith("mailto:") ? Link : ExternalLink;

  return (
    <Component
      className="flex flex-col overflow-hidden transition-all duration-200 rounded-xl cursor-pointer lg:w-96 lg:bg-muted lg:hover:shadow-md lg:hover:scale-[1.01] border border-transparent lg:border-border"
      href={href}
    >
      <div
        className="w-full h-32 bg-center bg-cover short:hidden hidden lg:block"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      <div className="flex flex-col flex-wrap lg:gap-1.5 lg:p-5">
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </Component>
  );
}
