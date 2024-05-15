import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

export function ExternalLink(
  props: ComponentProps<typeof Link> & {
    children: ReactNode;
    className?: string;
    href: string;
    title?: string;
  }
) {
  const onClick = () => {
    // For some reason, links inside of createPortal do not work
    window.open(props.href);
  };

  return <Link onClick={onClick} rel="noopener noreferrer" target="_blank" {...props} />;
}
