import { PAGE_SIZE } from "@/app/team/[id]/recordings/shared";
import { Library } from "@/components/Library";
import { getPersonalRecordings } from "@/graphql/queries/getPersonalRecordings";
import { getWorkspaceRecordings } from "@/graphql/queries/getWorkspaceRecordings";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    limit?: number;
  };
}) {
  const id = decodeURIComponent(params.id);
  const recordings =
    id === "me"
      ? await getPersonalRecordings()
      : await getWorkspaceRecordings(id);

  const limit = searchParams.limit ?? PAGE_SIZE;

  return (
    <Suspense fallback={null}>
      <Library limit={limit} recordings={recordings} />
    </Suspense>
  );
}
