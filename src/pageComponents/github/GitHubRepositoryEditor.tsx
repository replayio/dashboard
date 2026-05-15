import { Skeleton } from "@/components/ui/skeleton";
import type { GitHubRepositoryTreeView } from "@/lib/githubPullRequest";
import { GitHubRepositoryTabs } from "@/pageComponents/github/GitHubRepositoryTabs";
import { FileTree, useFileTree } from "@pierre/trees/react";
import type { Monaco } from "@monaco-editor/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { type CSSProperties, useEffect, useMemo } from "react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  loading: () => <EditorLoading />,
  ssr: false,
});

type GitHubRepositoryEditorProps = {
  owner: string;
  repo: string;
  repositoryTree: GitHubRepositoryTreeView;
  onSelectPath: (path: string) => void;
};

export function GitHubRepositoryEditor({
  onSelectPath,
  owner,
  repo,
  repositoryTree,
}: GitHubRepositoryEditorProps) {
  const { repository, selectedFile, tree, truncated } = repositoryTree;
  const filePaths = useMemo(
    () => new Set(tree.filter(entry => entry.type === "blob").map(entry => entry.path)),
    [tree]
  );
  const treePaths = useMemo(
    () =>
      tree.map(entry => {
        return entry.type === "tree" ? `${entry.path}/` : entry.path;
      }),
    [tree]
  );
  const selectedPath = selectedFile?.path ?? null;
  const language = selectedPath ? languageFromPath(selectedPath) : "plaintext";

  return (
      <main className="min-h-full bg-[#0a0a0a] p-6 text-zinc-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm font-medium text-zinc-500">GitHub</div>
            <div className="mt-1 flex min-w-0 items-center gap-2 text-sm text-zinc-500">
              <Link
                className="truncate text-zinc-400 no-underline hover:text-zinc-100 hover:underline"
                href={`/github.com/${encodeURIComponent(owner)}`}
              >
                {owner}
              </Link>
              <span>/</span>
              <span className="truncate">{repository.name}</span>
            </div>
            <h1 className="my-0 mt-2 truncate text-3xl font-semibold tracking-normal">
              {repository.name}
            </h1>
          </div>
          <GitHubRepositoryTabs active="code" owner={owner} repo={repo} />
        </header>

        {truncated ? (
          <div className="rounded-md border border-yellow-500/25 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200">
            GitHub truncated this repository tree, so some files may be missing from the browser.
          </div>
        ) : null}

        <section className="overflow-hidden rounded-lg border border-white/10 bg-[#050505] shadow-2xl shadow-black/30">
          <div className="grid h-[calc(100vh-190px)] min-h-[620px] grid-cols-[280px_minmax(0,1fr)]">
            <aside className="min-h-0 border-r border-white/10 bg-[#151515]">
              <div className="flex h-11 items-center gap-2 border-b border-white/10 px-4">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-2 min-w-0 truncate text-sm font-medium text-zinc-300">
                  {repository.name}
                </span>
              </div>
              <RepositoryFileTree
                filePaths={filePaths}
                onSelectPath={onSelectPath}
                paths={treePaths}
                selectedPath={selectedPath}
              />
            </aside>

            <section className="min-w-0 bg-[#050505]">
              <div className="flex h-11 items-center justify-between border-b border-white/10 bg-[#090909] px-3">
                <div className="inline-flex h-8 max-w-[65%] items-center rounded-md bg-[#1c1c1c] px-3 text-sm font-medium text-zinc-200">
                  <span className="truncate">{selectedPath ?? "No previewable file"}</span>
                </div>
                <div className="text-xs text-zinc-500">
                  {repository.defaultBranch ? repository.defaultBranch : "default branch"}
                </div>
              </div>

              {selectedFile ? (
                <MonacoEditor
                  beforeMount={defineReplayMonacoTheme}
                  height="calc(100% - 44px)"
                  language={selectedFile.isBinary ? "plaintext" : language}
                  options={{
                    automaticLayout: true,
                    contextmenu: false,
                    fontFamily:
                      "Berkeley Mono, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontLigatures: false,
                    fontSize: 14,
                    lineHeight: 22,
                    lineNumbersMinChars: 4,
                    minimap: { enabled: false },
                    padding: { bottom: 32, top: 20 },
                    readOnly: true,
                    renderLineHighlight: "none",
                    scrollBeyondLastLine: false,
                    scrollbar: {
                      alwaysConsumeMouseWheel: false,
                      horizontalScrollbarSize: 10,
                      verticalScrollbarSize: 10,
                    },
                    smoothScrolling: true,
                    wordWrap: "off",
                  }}
                  path={`github://${repository.fullName}/${selectedFile.path}`}
                  theme="replay-github-dark"
                  value={selectedFile.content}
                  width="100%"
                />
              ) : (
                <div className="flex h-[calc(100%-44px)] items-center justify-center text-sm text-zinc-500">
                  Select a file to preview it.
                </div>
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function RepositoryFileTree({
  filePaths,
  onSelectPath,
  paths,
  selectedPath,
}: {
  filePaths: Set<string>;
  onSelectPath: (path: string) => void;
  paths: string[];
  selectedPath: string | null;
}) {
  const expandedPaths = useMemo(
    () => (selectedPath ? expandedDirectoryPaths(selectedPath) : []),
    [selectedPath]
  );
  const { model } = useFileTree({
    density: "compact",
    flattenEmptyDirectories: true,
    icons: { colored: true, set: "complete" },
    initialExpandedPaths: expandedPaths,
    initialSelectedPaths: selectedPath ? [selectedPath] : [],
    itemHeight: 28,
    onSelectionChange: selectedPaths => {
      const nextSelectedPath = selectedPaths.find(path => filePaths.has(path));
      if (nextSelectedPath) {
        onSelectPath(nextSelectedPath);
      }
    },
    paths,
    search: true,
    stickyFolders: true,
  });
  const pathsKey = paths.join("\n");
  const expandedPathsKey = expandedPaths.join("\n");

  useEffect(() => {
    model.resetPaths(paths, { initialExpandedPaths: expandedPaths });
  }, [expandedPaths, expandedPathsKey, model, paths, pathsKey]);

  useEffect(() => {
    for (const path of model.getSelectedPaths()) {
      model.getItem(path)?.deselect();
    }

    if (!selectedPath) return;

    const item = model.getItem(selectedPath);
    item?.select();
    item?.focus();
  }, [model, selectedPath]);

  return (
    <FileTree
      className="h-[calc(100%_-_44px)]"
      model={model}
      style={{
        "--trees-accent-override": "#1fb7ff",
        "--trees-bg-muted-override": "#1f2937",
        "--trees-bg-override": "#151515",
        "--trees-border-color-override": "rgba(255,255,255,0.08)",
        "--trees-fg-muted-override": "#71717a",
        "--trees-fg-override": "#a1a1aa",
        "--trees-font-family-override":
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        "--trees-font-size-override": "13px",
        "--trees-selected-bg-override": "#1f2937",
        "--trees-selected-fg-override": "#22d3ee",
      } as CSSProperties}
    />
  );
}

function EditorLoading() {
  return (
    <div className="h-full bg-[#050505] p-5">
      <div className="space-y-3">
        {Array.from({ length: 18 }).map((_, index) => (
          <div className="flex items-center gap-4" key={index}>
            <Skeleton className="h-4 w-8 bg-white/10" />
            <Skeleton className="h-4 bg-white/10" style={{ width: `${50 + (index % 5) * 8}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function expandedDirectoryPaths(path: string) {
  const parts = path.split("/");
  parts.pop();

  return parts.reduce<string[]>((paths, part, index) => {
    const directory = `${parts.slice(0, index + 1).join("/")}/`;
    paths.push(directory);
    return paths;
  }, []);
}

function defineReplayMonacoTheme(monaco: Monaco) {
  monaco.editor.defineTheme("replay-github-dark", {
    base: "vs-dark",
    colors: {
      "editor.background": "#050505",
      "editor.foreground": "#d4d4d8",
      "editor.lineHighlightBackground": "#00000000",
      "editorLineNumber.activeForeground": "#a1a1aa",
      "editorLineNumber.foreground": "#71717a",
      "editorWhitespace.foreground": "#27272a",
      "scrollbarSlider.activeBackground": "#ffffff40",
      "scrollbarSlider.background": "#ffffff24",
      "scrollbarSlider.hoverBackground": "#ffffff32",
    },
    inherit: true,
    rules: [
      { foreground: "ff7b72", token: "keyword" },
      { foreground: "d2a8ff", token: "type" },
      { foreground: "79c0ff", token: "identifier" },
      { foreground: "7ee787", token: "string" },
      { foreground: "ffa657", token: "number" },
      { foreground: "8b949e", token: "comment" },
    ],
  });
}

function languageFromPath(path: string) {
  const extension = path.split(".").at(-1)?.toLowerCase();
  const name = path.split("/").at(-1)?.toLowerCase();

  if (name === "dockerfile") return "dockerfile";
  if (name === "makefile") return "makefile";

  switch (extension) {
    case "css":
      return "css";
    case "go":
      return "go";
    case "html":
      return "html";
    case "js":
    case "cjs":
    case "mjs":
      return "javascript";
    case "json":
      return "json";
    case "md":
    case "mdx":
      return "markdown";
    case "py":
      return "python";
    case "rs":
      return "rust";
    case "scss":
      return "scss";
    case "sh":
      return "shell";
    case "ts":
    case "tsx":
      return "typescript";
    case "xml":
      return "xml";
    case "yaml":
    case "yml":
      return "yaml";
    default:
      return "plaintext";
  }
}
