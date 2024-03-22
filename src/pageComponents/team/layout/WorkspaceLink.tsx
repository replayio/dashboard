import { NavLink } from "@/pageComponents/team/layout/NavLink";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useParams } from "next/navigation";

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

  return (
    <NavLink
      data-test-id={`NavLink-${id}`}
      href={isTest ? `/team/${id}/runs` : `/team/${id}/recordings`}
      iconType={isTest ? "test-suite" : "folder"}
      isActive={isActive}
      label={name}
    />
  );
}
