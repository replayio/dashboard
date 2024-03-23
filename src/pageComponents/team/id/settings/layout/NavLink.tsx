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

  return (
    <Link
      className={`flex flex-row gap-2 items-center px-2 py-1 transition cursor-pointer ${
        isActive ? "text-sky-500" : "text-white"
      }`}
      href={href}
    >
      <Icon className="w-6 h-6" type={icon} />
      {label}
    </Link>
  );
}
