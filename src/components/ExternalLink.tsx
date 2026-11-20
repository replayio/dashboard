import Link from "next/link";
import { ReactNode } from "react";

export function ExternalLink(props: {
  children: ReactNode;
  className?: string;
  href: string;
  title?: string;
}) {
  if (!isHttpUrl(props.href)) {
    return <span className={props.className}>{props.children}</span>;
  }

  const onClick = () => {
    // For some reason, links inside of createPortal do not work
    window.open(props.href, "_blank", "noopener");
  };

  return (
    <Link
      onClick={onClick}
      rel="noopener noreferrer"
      target="_blank"
      className={props.className}
      href={props.href}
      title={props.title}
    >
      {props.children}
    </Link>
  );
}

function isHttpUrl(href: string) {
  try {
    // relative hrefs resolve against the page, which is always http(s); only the protocol is read
    const { protocol } = new URL(href, "https://base.invalid");
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}
