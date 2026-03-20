import { Icon, IconType } from "@/components/Icon";
import { NavTooltip } from "@/components/NavTooltip";
import { useSidebar } from "@/components/SidebarContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import Link from "next/link";
import { HTMLAttributes, ReactNode } from "react";

export function LeftNavLink({
  href,
  iconType,
  isActive,
  label,
  title: titleProp,
  ...rest
}: HTMLAttributes<HTMLElement> & {
  href: string;
  iconType: IconType;
  isActive: boolean;
  label: ReactNode;
  title?: string;
}) {
  const { isCollapsed } = useSidebar();
  const Component = isActive ? "div" : Link;
  const tooltipText = titleProp ?? (typeof label === "string" ? label : undefined);
  const { onClick: restOnClick, ...restProps } = rest;

  // Scroll into view on mount
  useIsomorphicLayoutEffect(() => {
    if (isActive) {
      const element = document.querySelector(`[data-is-active="true"]`);
      if (element) {
        element.scrollIntoView({ behavior: "instant", block: "center" });
      }
    }
  }, [isActive]);

  const linkContent = (
    <Component
      className={`flex flex-row items-center text-foreground text-sm rounded-md transition-colors ${
        isCollapsed ? "w-full justify-center px-2 py-3" : "gap-2.5 px-3 py-2.5"
      } ${isActive ? "bg-accent font-medium cursor-default" : "hover:bg-accent"}`}
      data-is-active={isActive || undefined}
      data-test-name="LeftNavLink"
      href={href}
      onClick={e => {
        e.stopPropagation();
        restOnClick?.(e);
      }}
      {...restProps}
    >
      <Icon className="h-5 w-5 shrink-0 text-foreground md:block" type={iconType} />
      {!isCollapsed && <div className="grow truncate">{label}</div>}
    </Component>
  );

  if (isCollapsed && tooltipText) {
    return (
      <NavTooltip tooltip={tooltipText} side="right">
        {linkContent}
      </NavTooltip>
    );
  }

  return linkContent;
}
