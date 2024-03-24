import { NavLink } from "@/pageComponents/team/layout/NavLink";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useParams } from "next/navigation";
import { IconType } from "@/components/Icon";

export function WorkspaceLink({
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

  let iconType: IconType;
  if (id === "me") {
    iconType = "my-library";
  } else if (isTest) {
    iconType = "test-suite";
  } else {
    iconType = "folder";
  }

  return (
    <NavLink
      href={isTest ? `/team/${id}/runs` : `/team/${id}/recordings`}
      iconType={iconType}
      isActive={isActive}
      label={name}
    />
  );
}
