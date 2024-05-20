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
      className="rounded-md flex flex-col bg-slate-700 overflow-hidden w-72 hover:bg-slate-600 cursor-pointer transition text-white"
      href={href}
    >
      <div className="bg-gradient-to-br from-sky-500 to-pink-300 w-full h-32" />
      <div className="flex flex-col flex-wrap gap-2 p-6">
        <div className="text-xl">{title}</div>
        <div>{children}</div>
      </div>
    </Component>
  );
}
