import { Icon, IconType } from "@/components/Icon";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import Link from "next/link";
import { HTMLAttributes, ReactNode } from "react";

export function LeftNavLink({
  href,
  iconType,
  isActive,
  label,
  ...rest
}: HTMLAttributes<HTMLElement> & {
  href: string;
  iconType: IconType;
  isActive: boolean;
  label: ReactNode;
}) {
  const Component = isActive ? "div" : Link;

  // Scroll into view on mount
  useIsomorphicLayoutEffect(() => {
    if (isActive) {
      const element = document.querySelector(`[data-is-active="true"]`);
      if (element) {
        element.scrollIntoView({ behavior: "instant", block: "center" });
      }
    }
  }, [isActive]);

  return (
    <Component
      className={`flex flex-row gap-2.5 items-center text-foreground text-sm px-3 py-1.5 rounded-md transition-colors ${
        isActive ? "bg-accent font-medium cursor-default" : "hover:bg-accent"
      }`}
      data-is-active={isActive || undefined}
      data-test-name="LeftNavLink"
      href={href}
      {...rest}
    >
      <Icon className="h-4 w-4 hidden md:block shrink-0 text-muted-foreground" type={iconType} />
      <div className="grow truncate">{label}</div>
    </Component>
  );
}
