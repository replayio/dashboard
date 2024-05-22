import { ExternalLink } from "@/components/ExternalLink";
import Link from "next/link";
import { PropsWithChildren } from "react";

export function Block({
  children,
  href,
  title,
}: PropsWithChildren<{ href: string; title: string }>) {
  const Component = href.startsWith("/") || href.startsWith("mailto:") ? Link : ExternalLink;

  return (
    <Component
    className="flex flex-col overflow-hidden text-white transition rounded-md cursor-pointer bg-slate-700 w-72 hover:bg-slate-600"
      href={href}
    >
      <div className="hidden w-full h-32 bg-gradient-to-br from-sky-500 to-pink-300 lg:block" />
      <div className="flex flex-col flex-wrap gap-2 p-6">
        <div className="text-xl">{title}</div>
        <div>{children}</div>
      </div>
    </Component>
  );
}