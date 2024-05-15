import { IconType } from "@/components/Icon";
import { LeftNavLink } from "@/components/LeftNavLink";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useParams } from "next/navigation";

export function TeamDefaultNavLink({
  id,
  isTest,
  name,
}: {
  id: string;
  isTest: boolean;
  name: string;
}) {
  const params = useParams();
  const currentId = params?.id ?? "me";

  const isActive =
    id === decodeURIComponent(Array.isArray(currentId) ? currentId[0] ?? "" : currentId);

  useIsomorphicLayoutEffect(() => {
    if (isActive) {
      const element = document.querySelector(`[data-test-id="NavLink-${id}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [id, isActive]);

  let iconType: IconType;
  if (id === "me") {
    iconType = "my-library";
  } else if (isTest) {
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
