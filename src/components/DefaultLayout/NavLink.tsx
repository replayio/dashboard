import { SettingsButton } from "@/components/DefaultLayout/SettingsButton";
import { Icon } from "@/components/Icon";
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

  const Component = isActive ? "div" : Link;

  return (
    <Component
      className={`flex flex-row gap-2 items-center text-white px-2 py-1 transition  ${
        isActive ? "bg-sky-900 cursor-default" : "hover:bg-sky-900"
      }`}
      href={`/team/${id}/recordings`}
    >
      <Icon className="w-4 h-4" type="folder" />
      <div className="grow truncate">{name}</div>
      {isActive && <SettingsButton id={id} />}
    </Component>
  );
}
