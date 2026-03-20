import { useSidebar } from "@/components/SidebarContext";
import { HTMLAttributes } from "react";

export function MainWithSidebar({ className = "", ...rest }: HTMLAttributes<HTMLElement>) {
  const { isCollapsed } = useSidebar();

  return (
    <main
      className={`transition-[margin] duration-300 ease-out ${
        isCollapsed ? "ml-[60px]" : "ml-32 md:ml-72"
      } ${className}`}
      {...rest}
    />
  );
}
