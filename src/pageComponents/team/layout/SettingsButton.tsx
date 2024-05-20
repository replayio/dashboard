import { IconButton } from "@/components/IconButton";
import { useWorkspaces } from "@/graphql/queries/useWorkspaces";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SettingsButton({ id }: { id: string }) {
  const pathname = usePathname();

  const { workspaces } = useWorkspaces();
  const workspace = workspaces?.find(workspace => workspace.id === id);

  const isActive = pathname?.includes("settings");

  let href = `/team/${id}/settings`;
  if (isActive) {
    if (workspace?.isTest) {
      href = `/team/${id}/runs`;
    } else {
      href = `/team/${id}/recordings`;
    }
  }

  return (
    <Link href={href}>
      <IconButton
        className={isActive ? "outline outline-2 outline-sky-500" : ""}
        iconClassName={isActive ? "fill-white" : ""}
        iconType="settings"
      />
    </Link>
  );
}
