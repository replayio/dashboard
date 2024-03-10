import Link from "next/link";
import { ReactNode } from "react";

export function ExternalLink(props: {
  children: ReactNode;
  className?: string;
  href: string;
  title?: string;
}) {
  return <Link rel="noopener noreferrer" target="_blank" {...props} />;
}
