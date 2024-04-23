import { IconType } from "@/components/Icon";
import { LeftNavLink } from "@/components/LeftNavLink";
import { usePathname } from "next/navigation";

export function SettingsNavLink({
  iconType,
  label,
  route,
}: {
  iconType: IconType;
  label: string;
  route: string;
}) {
  const pathname = usePathname();

  const href = `/user/settings/${route}`;
  const isActive = pathname === href;

  return <LeftNavLink href={href} iconType={iconType} isActive={isActive} label={label} />;
}
