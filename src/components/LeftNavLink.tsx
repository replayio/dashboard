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
      className={`flex flex-row gap-2 items-center text-white px-2 py-1 transition rounded ${
        isActive ? "bg-sky-900 cursor-default" : "hover:text-sky-500"
      }`}
      data-is-active={isActive || undefined}
      data-test-name="LeftNavLink"
      href={href}
      {...rest}
    >
      <Icon className="hidden w-4 h-4 md:block shrink-0" type={iconType} />
      <div className="truncate grow">{label}</div>
    </Component>
  );
}
