import { Skeleton } from "@/components/ui/skeleton";
import type { GitHubPullRequestView } from "@/lib/githubPullRequest";
import { PatchDiff } from "@pierre/diffs/react";
import { ChevronDown, Columns2, Rows3 } from "lucide-react";
import { useMemo, useState } from "react";

type DiffStyle = "split" | "unified";

export function GitHubPullRequestDiff({ pullRequest }: { pullRequest: GitHubPullRequestView }) {
  const [collapsedFiles, setCollapsedFiles] = useState<Set<string>>(() => new Set());
  const [diffStyle, setDiffStyle] = useState<DiffStyle>("unified");
  const fileDiffs = useMemo(
    () =>
      pullRequest.files.flatMap(file => {
        if (!file.patch) return [];

        return [
          {
            file,
            patch: buildFilePatch(file),
          },
        ];
      }),
    [pullRequest.files]
  );

  function toggleFile(filename: string) {
    setCollapsedFiles(current => {
      const next = new Set(current);
      if (next.has(filename)) {
        next.delete(filename);
      } else {
        next.add(filename);
      }
      return next;
    });
  }

  if (!fileDiffs.length) {
    return (
      <section className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
        No text diff is available for this pull request.
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="my-0 text-base font-semibold">Changes</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{pullRequest.files.length} files</span>
          <DiffStyleToggle diffStyle={diffStyle} onChange={setDiffStyle} />
        </div>
      </div>
      <div className="divide-y divide-border">
        {fileDiffs.map(({ file, patch }) => {
          const isCollapsed = collapsedFiles.has(file.filename);

          return (
            <article key={file.filename}>
              <button
                aria-expanded={!isCollapsed}
                className="flex min-h-12 w-full items-center justify-between gap-4 bg-background px-4 py-3 text-left hover:bg-muted/60"
                onClick={() => toggleFile(file.filename)}
                type="button"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                      isCollapsed ? "-rotate-90" : ""
                    }`}
                  />
                  <span className="min-w-0 truncate font-mono text-sm">{file.filename}</span>
                  <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {file.status}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-3 text-xs">
                  <span className="text-emerald-600">+{file.additions}</span>
                  <span className="text-red-600">-{file.deletions}</span>
                </div>
              </button>

              {isCollapsed ? null : (
                <PatchDiff
                  className="max-h-[calc(100vh-320px)] overflow-auto"
                  disableWorkerPool
                  options={{
                    diffIndicators: "classic",
                    diffStyle,
                    disableFileHeader: true,
                    hunkSeparators: "line-info",
                    lineDiffType: "word",
                    overflow: "scroll",
                    theme: "pierre-dark",
                    themeType: "dark",
                  }}
                  patch={patch}
                />
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function DiffStyleToggle({
  diffStyle,
  onChange,
}: {
  diffStyle: DiffStyle;
  onChange: (diffStyle: DiffStyle) => void;
}) {
  return (
    <div className="inline-flex rounded-md border border-border bg-background p-1">
      <button
        className={`inline-flex h-7 items-center gap-1 rounded px-2 text-xs font-medium ${
          diffStyle === "unified"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
        onClick={() => onChange("unified")}
        type="button"
      >
        <Rows3 className="h-3.5 w-3.5" />
        Unified
      </button>
      <button
        className={`inline-flex h-7 items-center gap-1 rounded px-2 text-xs font-medium ${
          diffStyle === "split"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
        onClick={() => onChange("split")}
        type="button"
      >
        <Columns2 className="h-3.5 w-3.5" />
        Split
      </button>
    </div>
  );
}

export function GitHubPullRequestDiffLoading() {
  return (
    <section className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="space-y-3 p-4">
        {Array.from({ length: 14 }).map((_, index) => (
          <div className="flex items-center gap-3" key={index}>
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4" style={{ width: `${45 + (index % 6) * 7}%` }} />
          </div>
        ))}
      </div>
    </section>
  );
}

function buildFilePatch(file: GitHubPullRequestView["files"][number]) {
  const oldPath = `a/${file.filename}`;
  const newPath = `b/${file.filename}`;
  const oldHeader = file.status === "added" ? "/dev/null" : oldPath;
  const newHeader = file.status === "removed" ? "/dev/null" : newPath;

  return [
    `diff --git ${oldPath} ${newPath}`,
    `--- ${oldHeader}`,
    `+++ ${newHeader}`,
    file.patch,
  ].join("\n");
}
