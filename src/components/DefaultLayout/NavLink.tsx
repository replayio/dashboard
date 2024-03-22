import { SettingsButton } from "@/components/DefaultLayout/SettingsButton";
import { Icon } from "@/components/Icon";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import Link from "next/link";
import { useParams } from "next/navigation";

export function NavLink({ id, name }: { id: string; name: string }) {
  const params = useParams();
  const currentId = params?.id ?? "me";

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

  const Component = isActive ? "div" : Link;

  return (
    <Component
      className={`flex flex-row gap-2 items-center text-white px-2 py-1 transition  ${
        isActive ? "bg-sky-900 cursor-default" : "hover:bg-sky-900"
      }`}
      data-test-id={`NavLink-${id}`}
      href={`/team/${id}/recordings`}
    >
      <Icon className="w-4 h-4" type="folder" />
      <div className="grow truncate">{name}</div>
      {isActive && <SettingsButton id={id} />}
    </Component>
  );
}
