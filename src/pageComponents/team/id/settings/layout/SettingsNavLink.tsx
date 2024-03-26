import { IconType } from "@/components/Icon";
import { LeftNavLink } from "@/components/LeftNavLink";
import { usePathname } from "next/navigation";

export function SettingsNavLink({
  iconType,
  label,
  route,
  workspaceId,
}: {
  iconType: IconType;
  label: string;
  route: string;
  workspaceId: string;
}) {
  const pathname = usePathname();
  const href = `/team/${workspaceId}/settings/${route}`;
  const isActive = pathname === href;

  return (
    <LeftNavLink
      href={href}
      iconType={iconType}
      isActive={isActive}
      label={label}
    />
  );
}
