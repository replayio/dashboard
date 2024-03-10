"use client";

import { Icon, IconType } from "@/components/Icon";
import { useNextLink } from "@/hooks/useNextLink";
import Link from "next/link";
import { useParams } from "next/navigation";

export function NavLink({
  id,
  isTest,
  name,
}: {
  id: string;
  isTest: boolean;
  name: string;
}) {
  const { id: currentId = "" } = useParams();

  const { isPending, onClick } = useNextLink();

  const isActive =
    id ===
    decodeURIComponent(
      Array.isArray(currentId) ? currentId[0] ?? "" : currentId
    );

  let iconType: IconType;
  if (isPending) {
    iconType = "loading-spinner";
  } else {
    iconType = isTest ? "test-suite" : "folder";
  }

  return (
    <Link
      className={`flex flex-row gap-2 items-center text-white px-4 py-1 transition ${
        isActive ? "bg-sky-900 cursor-default" : "hover:bg-sky-900"
      } ${isPending ? "bg-sky-900 opacity-75" : ""}`}
      href={`/team/${id}/recordings`}
      onClick={onClick}
    >
      <Icon
        className={`w-4 h-4 ${isPending ? "animate-spin" : ""}`}
        type={iconType}
      />
      {name}
    </Link>
  );
}
