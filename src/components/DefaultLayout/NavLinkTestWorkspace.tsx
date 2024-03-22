import { SettingsButton } from "@/components/DefaultLayout/SettingsButton";
import { Icon } from "@/components/Icon";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function NavLinkTestWorkspace({
  id,
  name,
}: {
  id: string;
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

  useIsomorphicLayoutEffect(() => {
    if (isActive) {
      const element = document.querySelector(`[data-test-id="NavLink-${id}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [id, isActive]);

  if (!isActive) {
    return (
      <Link
        className="flex flex-row gap-2 items-center text-white px-2 py-1 transition hover:bg-sky-900"
        data-test-id={`NavLink-${id}`}
        href={`/team/${id}/runs`}
      >
        <Icon className="w-4 h-4" type="test-suite" />
        <div className="grow truncate">{name}</div>
      </Link>
    );
  } else {
    return (
      <div
        className="flex flex-col text-white px-2 py-1 pr-1 bg-sky-900 cursor-default"
        data-test-id={`NavLink-${id}`}
      >
        <div className="flex flex-row gap-2 items-center">
          <Icon className="w-4 h-4" type="test-suite" />
          <div className="grow truncate">{name}</div>
          <SettingsButton id={id} />
        </div>
        <Link
          className={`text-sm text-white py-1 pl-6 ${
            pathname?.endsWith("runs") ? "bg-sky-900 font-bold" : ""
          }`}
          href={`/team/${id}/runs`}
        >
          Runs
        </Link>
        <Link
          className={`text-sm text-white py-1 pl-6 ${
            pathname?.endsWith("tests") ? "bg-sky-900 font-bold" : ""
          }`}
          href={`/team/${id}/tests`}
        >
          Tests
        </Link>
      </div>
    );
  }
}
