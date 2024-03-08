import { LeftNavigation } from "@/components/LeftNavigation";
import { Library } from "@/components/Library";
import { getPersonalRecordings } from "@/graphql/queries/getPersonalRecordings";
import { getWorkspaceRecordings } from "@/graphql/queries/getWorkspaceRecordings";

export default async function Page({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const recordings =
    id === "me"
      ? await getPersonalRecordings()
      : await getWorkspaceRecordings(id);

  return (
    <div className="flex h-screen w-screen flex-row">
      <LeftNavigation />
      <Library recordings={recordings} />
    </div>
  );
}
