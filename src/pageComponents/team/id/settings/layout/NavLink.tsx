import { Icon, IconType } from "@/components/Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  icon,
  label,
  route,
  workspaceId,
}: {
  icon: IconType;
  label: string;
  route: string;
  workspaceId: string;
}) {
  const pathname = usePathname();
  const href = `/team/${workspaceId}/settings/${route}`;
  const isActive = pathname === href;

  const Component = isActive ? "div" : Link;

  return (
    <Component
      className={`flex flex-row gap-2 items-center text-white px-2 py-1 mx-1 transition rounded ${
        isActive ? "bg-sky-900 cursor-default" : "hover:text-sky-500"
      }`}
      href={href}
    >
      <Icon className="w-6 h-6" type={icon} />
      {label}
    </Component>
  );
}
