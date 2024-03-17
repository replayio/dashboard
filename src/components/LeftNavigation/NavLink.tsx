"use client";

import { Icon } from "@/components/Icon";
import { SettingsButton } from "@/components/LeftNavigation/SettingsButton";
import { useNextLink } from "@/hooks/useNextLink";
import Link from "next/link";
import { useParams } from "next/navigation";

export function NavLink({
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
  const params = useParams();
  const currentId = params?.id ?? "me";

  const isActive =
    id ===
    decodeURIComponent(
      Array.isArray(currentId) ? currentId[0] ?? "" : currentId
    );

  const { isPending, onClick } = useNextLink();

  const showSettingsButton = id !== "me" && isActive;

  return (
    <Link
      className={`flex flex-row gap-2 items-center text-white px-4 py-1 pr-2 transition  ${
        isActive ? "bg-sky-900 cursor-default" : "hover:bg-sky-900"
      } ${isPending ? "bg-sky-900 opacity-75" : ""}`}
      href={`/team/${id}/recordings`}
      onClick={onClick}
    >
      <Icon
        className={`w-4 h-4 ${isPending ? "animate-spin" : ""}`}
        type={isPending ? "loading-spinner" : "folder"}
      />
      <div className="grow truncate">{name}</div>
      {showSettingsButton && (
        <SettingsButton
          currentUserId={currentUserId}
          id={id}
          invitationCode={invitationCode}
          name={name}
        />
      )}
    </Link>
  );
}
