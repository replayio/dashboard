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
      className="flex flex-col overflow-hidden text-white transition rounded-md lg:shadow-xl cursor-pointer lg:w-96 lg:bg-slate-950 lg:hover:bg-black"
      href={href}
    >
      <div
        className="w-full h-32 bg-center bg-cover short:hidden hidden lg:block"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      <div className="flex flex-col flex-wrap lg:gap-2 lg:p-6">
        <div className="text-xl text-white underline lg:no-underline">{title}</div>
        <div>{children}</div>
      </div>
    </Component>
  );
}
