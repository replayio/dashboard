import { IconType } from "@/components/Icon";
import { LeftNavLink } from "@/components/LeftNavLink";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useParams } from "next/navigation";

export function WorkspaceNavLink({
  id,
  isTest,
  name,
}: {
  id: string;
  isTest: boolean;
  name: string;
}) {
  const params = useParams();
  const currentId = params?.id
    ? decodeURIComponent(Array.isArray(params?.id) ? params?.id[0] ?? "" : params?.id)
    : null;

  const isActive = id === currentId;

  useIsomorphicLayoutEffect(() => {
    if (isActive) {
      const element = document.querySelector(`[data-test-id="NavLink-${id}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [id, isActive]);

  let iconType: IconType;
  if (isTest) {
    iconType = "test-suite";
  } else {
    iconType = "folder";
  }

  let href;
  if (isTest) {
    href = `/team/${id}/runs`;
  } else {
    href = `/team/${id}/recordings`;
  }

  return (
    <LeftNavLink
      href={href}
      iconType={iconType}
      isActive={isActive}
      label={
        <div className="flex flex-row items-center gap-2">
          <div className="truncate">{name}</div>
        </div>
      }
    />
  );
}
