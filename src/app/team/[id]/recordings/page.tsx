import { Library } from "@/components/Library";
import { getPersonalRecordings } from "@/graphql/queries/getPersonalRecordings";
import { getWorkspaceRecordings } from "@/graphql/queries/getWorkspaceRecordings";

export default async function Page({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const recordings =
    id === "me"
      ? await getPersonalRecordings()
      : await getWorkspaceRecordings(id);

  return <Library recordings={recordings} />;
}
