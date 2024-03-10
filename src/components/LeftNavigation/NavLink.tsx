"use client";

import { Icon, IconType } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import { WorkspaceSettings } from "@/components/LeftNavigation/WorkspaceSettings";
import { useNextLink } from "@/hooks/useNextLink";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MouseEvent, useState } from "react";

export function NavLink({
  id,
  isTest,
  name,
}: {
  id: string;
  isTest: boolean;
  name: string;
}) {
  const params = useParams();
  const currentId = params?.id ?? "";

  const isActive =
    id ===
    decodeURIComponent(
      Array.isArray(currentId) ? currentId[0] ?? "" : currentId
    );

  const { isPending, onClick } = useNextLink();

  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const showSettingsButton = id !== "me" && isActive;

  let iconType: IconType;
  if (isPending) {
    iconType = "loading-spinner";
  } else {
    iconType = isTest ? "test-suite" : "folder";
  }

  const onSettingsClick = (event: MouseEvent) => {
    event.preventDefault();
    setShowSettingsDialog(true);
  };

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
        type={iconType}
      />
      <div className="grow truncate">{name}</div>
      {showSettingsButton && (
        <IconButton onClick={onSettingsClick} iconType="settings" />
      )}
      {showSettingsDialog && (
        <WorkspaceSettings
          id={id}
          name={name}
          onDismiss={() => setShowSettingsDialog(false)}
        />
      )}
    </Link>
  );
}
