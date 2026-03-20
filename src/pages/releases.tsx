import { EmptyLayout } from "@/components/EmptyLayout";
import { ExternalLink } from "@/components/ExternalLink";
import { Release, fetchReleases } from "@/pages/api/releases";
import { format } from "date-fns/format";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useMemo } from "react";

export default function Page({ releases }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const latestReleases = useMemo(() => {
    const latest: Record<string, Release> = {};
    for (const release of releases) {
      const { runtime, platform, architecture } = release;
      const key = `${runtime}-${platform}-${architecture}`;
      if (!latest[key]) {
        latest[key] = release;
      }
    }
    return Object.values(latest);
  }, [releases]);

  return (
    <div className="h-screen flex flex-col gap-6 p-6 overflow-auto">
      <div>
        <h1 className="text-lg font-semibold mb-1">Latest releases</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Most recent build for each runtime, platform, and architecture combination.
        </p>
        <div
          className="rounded-lg border border-border bg-card overflow-hidden"
          data-test-id="latest-releases-table"
        >
          <ReleasesTable releases={latestReleases} />
        </div>
      </div>
      <div>
        <h1 className="text-lg font-semibold mb-1">All releases</h1>
        <p className="text-sm text-muted-foreground mb-4">Complete list of available builds.</p>
        <div
          className="rounded-lg border border-border bg-card overflow-auto shrink"
          data-test-id="all-releases-table"
        >
          <ReleasesTable releases={releases} />
        </div>
      </div>
    </div>
  );
}

const COLUMNS = [
  { key: "runtime", label: "Software", className: "w-24" },
  { key: "platform", label: "Platform", className: "w-28" },
  { key: "architecture", label: "Architecture", className: "w-28" },
  { key: "buildId", label: "Build ID", className: "min-w-0" },
  { key: "date", label: "Date", className: "w-28" },
  { key: "action", label: "", className: "w-24" },
] as const;

function ReleasesTable({ releases }: { releases: Release[] }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border bg-muted/50">
          {COLUMNS.map(({ key, label, className }) => (
            <th
              key={key}
              className={`px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider ${className}`}
            >
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {releases.map(release => (
          <tr
            className="border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors"
            data-test-name="release-row"
            data-test-type={release.runtime}
            key={release.buildId}
          >
            <td className="px-4 py-3 font-medium">{release.runtime}</td>
            <td className="px-4 py-3 text-muted-foreground">{release.platform}</td>
            <td className="px-4 py-3 text-muted-foreground">{release.architecture ?? "unknown"}</td>
            <td className="px-4 py-3 truncate max-w-[200px]" title={release.buildId}>
              {release.buildId}
            </td>
            <td className="px-4 py-3 text-muted-foreground">
              {format(new Date(release.time), "MMM d, y")}
            </td>
            <td className="px-4 py-3">
              <ExternalLink
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
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

export async function getServerSideProps() {
  const releases = await fetchReleases();

  return {
    props: {
      releases,
    },
  };
}
