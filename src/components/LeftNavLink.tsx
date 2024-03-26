import { Icon, IconType } from "@/components/Icon";
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

  return (
    <Component
      className={`flex flex-row gap-2 items-center text-white px-2 py-1 mx-1 transition rounded ${
        isActive ? "bg-sky-900 cursor-default" : "hover:text-sky-500"
      }`}
      data-is-active={isActive || undefined}
      data-test-name="LeftNavLink"
      href={href}
      {...rest}
    >
      <Icon className="w-4 h-4" type={iconType} />
      <div className="grow truncate">{label}</div>
    </Component>
  );
}
