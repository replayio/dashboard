import { Icon } from "@/components/Icon";
import { SettingsButton } from "@/components/LeftNavigation/SettingsButton";
import { useNextLink } from "@/hooks/useNextLink";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function NavLinkTestWorkspace({
  currentUserId,
  id,
  invitationCode,
  name,
}: {
  currentUserId: string | null;
  id: string;
  invitationCode: string;
  name: string;
}) {
  const pathname = usePathname();
  const params = useParams();
  const currentId = params?.id ?? "";

  const isActive =
    id ===
    decodeURIComponent(
      Array.isArray(currentId) ? currentId[0] ?? "" : currentId
    );

  const { isPending, onClick } = useNextLink();

  if (!isActive) {
    return (
      <Link
        className={`flex flex-row gap-2 items-center text-white px-4 py-1 pr-2 transition hover:bg-sky-900 ${
          isPending ? "bg-sky-900 opacity-75" : ""
        }`}
        href={`/team/${id}/runs`}
        onClick={onClick}
      >
        <Icon
          className={`w-4 h-4 ${isPending ? "animate-spin" : ""}`}
          type={isPending ? "loading-spinner" : "test-suite"}
        />
        <div className="grow truncate">{name}</div>
      </Link>
    );
  } else {
    const isRunsRouteActive = pathname?.endsWith("runs");
    const isTestsRouteActive = pathname?.endsWith("tests");

    return (
      <div className="flex flex-col text-white px-4 py-1 pr-2 bg-sky-900 cursor-default">
        <div className="flex flex-row gap-2 items-center">
          <Icon className="w-4 h-4" type="test-suite" />
          <div className="grow truncate">{name}</div>
          <SettingsButton
            currentUserId={currentUserId}
            id={id}
            invitationCode={invitationCode}
            name={name}
          />
        </div>
        <Link
          className={`text-sm text-white py-1 pl-6 ${
            isRunsRouteActive ? "bg-sky-900 font-bold" : ""
          } ${isPending ? "bg-sky-900 opacity-75" : ""}`}
          href={`/team/${id}/runs`}
          onClick={onClick}
        >
          Runs
        </Link>
        <Link
          className={`text-sm text-white py-1 pl-6 ${
            isTestsRouteActive ? "bg-sky-900 font-bold" : ""
          } ${isPending ? "bg-sky-900 opacity-75" : ""}`}
          href={`/team/${id}/tests`}
          onClick={onClick}
        >
          Tests
        </Link>
      </div>
    );
  }
}
