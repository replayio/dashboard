import { ExternalLink } from "@/components/ExternalLink";
import Link from "next/link";
import { PropsWithChildren } from "react";

export function Block({
  children,
  href,
  title,
  imageUrl, // Add an imageUrl prop
}: PropsWithChildren<{ href: string; title: string; imageUrl?: string }>) {
  // imageUrl is optional
  const Component = href.startsWith("/") || href.startsWith("mailto:") ? Link : ExternalLink;

  return (
    <Component
      className="flex flex-col overflow-hidden text-white transition rounded-md shadow-xl cursor-pointer w-96 bg-slate-950 hover:bg-black"
      href={href}
    >
      <div
        className="w-full h-32 bg-center bg-cover short:hidden"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="flex flex-col flex-wrap gap-2 p-6">
        <div className="text-xl">{title}</div>
        <div>{children}</div>
      </div>
    </Component>
  );
}
