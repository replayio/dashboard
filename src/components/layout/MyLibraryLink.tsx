import { LeftNavLink } from "@/components/LeftNavLink";

import { usePathname } from "next/navigation";

export function MyLibraryNavLink() {
  const pathname = usePathname();
  const isActive = pathname === "/team/me/recordings";

  return (
    <LeftNavLink
      href="/team/me/recordings"
      iconType="my-library"
      isActive={isActive}
      label="My Library"
    />
  );
}
