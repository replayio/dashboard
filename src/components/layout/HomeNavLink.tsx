import { LeftNavLink } from "@/components/LeftNavLink";

import { usePathname } from "next/navigation";

export function HomeNavLink() {
  const pathname = usePathname();
  const isActive = pathname === "/home";

  return <LeftNavLink href="/home" iconType="home" isActive={isActive} label="Home" />;
}
