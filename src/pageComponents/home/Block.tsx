import { ExternalLink } from "@/components/ExternalLink";
import Link from "next/link";
import { PropsWithChildren } from "react";
import styles from './Block.module.css';

export function Block({
  children,
  href,
  title,
}: PropsWithChildren<{ href: string; title: string }>) {
  const Component = href.startsWith("/") || href.startsWith("mailto:") ? Link : ExternalLink;

  return (
    <Component
      className={styles.block}
      href={href}
    >
      <div className={styles.gradient} />
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div>{children}</div>
      </div>
    </Component>
  );
}