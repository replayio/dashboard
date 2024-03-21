import { EmptyLayout } from "@/components/EmptyLayout";
import { ExternalLink } from "@/components/ExternalLink";
import { Release, fetchReleases } from "@/pages/api/releases";
import { format } from "date-fns/format";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useMemo } from "react";

export default function Page({
  releases,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const latestReleases = useMemo(() => {
    const latest: Record<string, Release> = {};
    for (const release of releases) {
      const { runtime, platform } = release;
      const key = `${runtime}-${platform}`;
      if (!latest[key]) {
        latest[key] = release;
      }
    }
    return Object.values(latest);
  }, [releases]);

  return (
    <div className="h-screen flex flex-col gap-2 p-2">
      <div className="text-xl">Latest releases</div>
      <div className="bg-slate-800 px-4 py-2 rounded-md">
        <ReleasesTable releases={latestReleases} />
      </div>
      <div className="text-xl">All releases</div>
      <div className="bg-slate-800 px-4 py-2 rounded-md shrink overflow-auto">
        <ReleasesTable releases={releases} />
      </div>
    </div>
  );
}

function ReleasesTable({ releases }: { releases: Release[] }) {
  return (
    <table className="table-fixed">
      <tbody>
        {releases.map((release) => (
          <tr key={release.buildId}>
            <td className="min-w-24">{release.runtime}</td>
            <td className="min-w-20">{release.platform}</td>
            <td className="truncate">{release.buildId}</td>
            <td className="min-w-28">
              {format(new Date(release.time), "MMM d, y")}
            </td>
            <td className="min-w-24">
              <ExternalLink
                href={`https://static.replay.io/downloads/${release.buildFile}`}
              >
                Download
              </ExternalLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Page.Layout = EmptyLayout;

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const releases = await fetchReleases();

  return {
    props: {
      releases,
    },
  };
}
