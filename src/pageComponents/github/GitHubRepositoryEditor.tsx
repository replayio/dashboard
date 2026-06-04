import { Skeleton } from "@/components/ui/skeleton";
import type { GitHubRepositoryTreeView } from "@/lib/githubPullRequest";
import { GitHubRepositoryTopBar } from "@/pageComponents/github/GitHubRepositoryTabs";
import { SpriteTerminalPanel } from "@/pageComponents/github/SpriteTerminalPanel";
import { FileTree, useFileTree } from "@pierre/trees/react";
import type { Monaco } from "@monaco-editor/react";
import { Loader2, RefreshCw, Save, Server } from "lucide-react";
import dynamic from "next/dynamic";
import { type CSSProperties, useCallback, useEffect, useMemo, useState } from "react";

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

type CodespriteStatus = "creating" | "error" | "idle" | "ready";

type CodespriteFsEntry = {
  mtime: number;
  path: string;
  size: number;
  type: "directory" | "file";
};

type CodespriteState = {
  content: string;
  cwd: string | null;
  dirty: boolean;
  entityUrl: string | null;
  error: string | null;
  entries: CodespriteFsEntry[];
  projectPathHint: string | null;
  saving: boolean;
  selectedPath: string | null;
  spriteName: string | null;
  status: CodespriteStatus;
};

type CodespriteResponse = {
  cwd?: string;
  entityUrl?: string;
  error?: string;
  projectPathHint?: string;
  spriteName?: string;
};

type CodespriteSnapshotResponse = {
  cwd?: string;
  defaultFile?: string | null;
  entries?: CodespriteFsEntry[];
  error?: string;
  spriteName?: string;
};

type CodespriteReadResponse = {
  contentBase64?: string;
  error?: string;
};

const initialCodespriteState: CodespriteState = {
  content: "",
  cwd: null,
  dirty: false,
  entityUrl: null,
  error: null,
  entries: [],
  projectPathHint: null,
  saving: false,
  selectedPath: null,
  spriteName: null,
  status: "idle",
};

export function GitHubRepositoryEditor({
  onSelectPath,
  owner,
  repo,
  repositoryTree,
}: GitHubRepositoryEditorProps) {
  const { repository, selectedFile, tree, truncated } = repositoryTree;
  const [codesprite, setCodesprite] = useState<CodespriteState>(initialCodespriteState);
  const codespriteReady = codesprite.status === "ready" && !!codesprite.entityUrl;
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
  const codespriteFilePaths = useMemo(
    () =>
      new Set(codesprite.entries.filter(entry => entry.type === "file").map(entry => entry.path)),
    [codesprite.entries]
  );
  const codespriteTreePaths = useMemo(
    () =>
      codesprite.entries.map(entry => {
        return entry.type === "directory" ? `${entry.path}/` : entry.path;
      }),
    [codesprite.entries]
  );
  const selectedPath = selectedFile?.path ?? null;
  const activePath = codespriteReady ? codesprite.selectedPath : selectedPath;
  const activeContent = codespriteReady ? codesprite.content : selectedFile?.content;
  const activeLanguage = activePath ? languageFromPath(activePath) : "plaintext";
  const isBusy = codesprite.status === "creating";

  const readCodespriteFile = useCallback(
    async (path: string, context?: { entityUrl: string; projectPathHint: string | null }) => {
      const entityUrl = context?.entityUrl ?? codesprite.entityUrl;
      if (!entityUrl) return;

      setCodesprite(current => ({
        ...current,
        dirty: false,
        error: null,
        selectedPath: path,
      }));

      const response = await fetch("/api/codesprite/editor-fs", {
        body: JSON.stringify({
          entityUrl,
          operation: "readFile",
          path,
          projectPathHint: context?.projectPathHint ?? codesprite.projectPathHint,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const payload = (await response.json().catch(() => null)) as CodespriteReadResponse | null;
      if (!response.ok || !payload?.contentBase64) {
        throw new Error(payload?.error ?? "Unable to read codesprite file.");
      }
      const content = base64ToText(payload.contentBase64);

      setCodesprite(current => ({
        ...current,
        content,
        dirty: false,
        selectedPath: path,
      }));
    },
    [codesprite.entityUrl, codesprite.projectPathHint]
  );

  const loadCodespriteSnapshot = useCallback(
    async (context: {
      entityUrl: string;
      preferredPath?: string | null;
      projectPathHint: string | null;
    }) => {
      const response = await fetch("/api/codesprite/editor-fs", {
        body: JSON.stringify({
          entityUrl: context.entityUrl,
          operation: "snapshot",
          projectPathHint: context.projectPathHint,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const payload = (await response
        .json()
        .catch(() => null)) as CodespriteSnapshotResponse | null;
      if (!response.ok || !payload?.entries) {
        throw new Error(payload?.error ?? "Unable to load codesprite workspace.");
      }

      const nextPath =
        context.preferredPath && payload.entries.some(entry => entry.path === context.preferredPath)
          ? context.preferredPath
          : payload.defaultFile ??
            payload.entries.find(entry => entry.type === "file")?.path ??
            null;

      setCodesprite(current => ({
        ...current,
        cwd: payload.cwd ?? current.cwd,
        entries: payload.entries ?? [],
        selectedPath: nextPath,
        spriteName: payload.spriteName ?? current.spriteName,
      }));

      if (nextPath) {
        await readCodespriteFile(nextPath, context);
      }
    },
    [readCodespriteFile]
  );

  async function handleCreateCodesprite() {
    setCodesprite(current => ({
      ...current,
      error: null,
      status: "creating",
    }));

    try {
      const response = await fetch("/api/codesprite", {
        body: JSON.stringify({
          repository: {
            defaultBranch: repository.defaultBranch,
            fullName: repository.fullName,
            name: repository.name,
          },
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const payload = (await response.json().catch(() => null)) as CodespriteResponse | null;
      if (!response.ok || !payload?.entityUrl || !payload.projectPathHint) {
        throw new Error(payload?.error ?? "Unable to create codesprite.");
      }

      setCodesprite(current => ({
        ...current,
        cwd: payload.cwd ?? null,
        entityUrl: payload.entityUrl ?? null,
        projectPathHint: payload.projectPathHint ?? null,
        spriteName: payload.spriteName ?? null,
        status: "ready",
      }));
      await loadCodespriteSnapshot({
        entityUrl: payload.entityUrl,
        preferredPath: selectedPath,
        projectPathHint: payload.projectPathHint,
      });
    } catch (error) {
      setCodesprite(current => ({
        ...current,
        error: error instanceof Error ? error.message : "Unable to create codesprite.",
        status: "error",
      }));
    }
  }

  async function handleRefreshCodesprite() {
    if (!codesprite.entityUrl) return;
    try {
      await loadCodespriteSnapshot({
        entityUrl: codesprite.entityUrl,
        preferredPath: codesprite.selectedPath,
        projectPathHint: codesprite.projectPathHint,
      });
    } catch (error) {
      setCodesprite(current => ({
        ...current,
        error: error instanceof Error ? error.message : "Unable to refresh codesprite.",
      }));
    }
  }

  async function handleSaveCodesprite() {
    if (!codesprite.entityUrl || !codesprite.selectedPath || codesprite.saving) return;

    setCodesprite(current => ({ ...current, error: null, saving: true }));
    try {
      const response = await fetch("/api/codesprite/editor-fs", {
        body: JSON.stringify({
          contentBase64: textToBase64(codesprite.content),
          entityUrl: codesprite.entityUrl,
          operation: "writeFile",
          path: codesprite.selectedPath,
          projectPathHint: codesprite.projectPathHint,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        throw new Error(payload?.error ?? "Unable to save codesprite file.");
      }
      setCodesprite(current => ({ ...current, dirty: false, saving: false }));
    } catch (error) {
      setCodesprite(current => ({
        ...current,
        error: error instanceof Error ? error.message : "Unable to save codesprite file.",
        saving: false,
      }));
    }
  }

  function handleCodespriteContentChange(value: string | undefined) {
    setCodesprite(current => ({
      ...current,
      content: value ?? "",
      dirty: true,
    }));
  }

  return (
    <main className="flex h-full min-h-[680px] flex-col bg-[#0a0a0a] text-zinc-100">
      <GitHubRepositoryTopBar active="code" owner={owner} repo={repo} repoName={repository.name} />
      <div className="flex min-h-0 flex-1 flex-col">
        {truncated ? (
          <div className="border-b border-yellow-500/25 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200 md:px-6">
            GitHub truncated this repository tree, so some files may be missing from the browser.
          </div>
        ) : null}

        <section className="min-h-0 w-full flex-1 overflow-hidden bg-[#050505]">
          <div className="grid h-full min-h-0 grid-cols-[260px_minmax(0,1fr)] md:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="min-h-0 border-r border-white/10 bg-[#151515]">
              <RepositoryFileTree
                filePaths={codespriteReady ? codespriteFilePaths : filePaths}
                onSelectPath={path => {
                  if (codespriteReady) {
                    void readCodespriteFile(path).catch(error => {
                      setCodesprite(current => ({
                        ...current,
                        error:
                          error instanceof Error
                            ? error.message
                            : "Unable to read codesprite file.",
                      }));
                    });
                    return;
                  }
                  onSelectPath(path);
                }}
                paths={codespriteReady ? codespriteTreePaths : treePaths}
                selectedPath={activePath}
              />
            </aside>

            <section className="min-h-0 min-w-0 bg-[#050505]">
              <div className="flex h-11 items-center justify-between border-b border-white/10 bg-[#090909] px-3">
                <div className="inline-flex h-8 max-w-[65%] items-center rounded-md bg-[#1c1c1c] px-3 text-sm font-medium text-zinc-200">
                  <span className="truncate">{activePath ?? "No previewable file"}</span>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {codesprite.error ? (
                    <span
                      className="max-w-96 truncate text-xs text-red-300"
                      title={codesprite.error}
                    >
                      {codesprite.error}
                    </span>
                  ) : codespriteReady ? (
                    <span
                      className="max-w-44 truncate text-xs text-zinc-500"
                      title={codesprite.cwd ?? undefined}
                    >
                      {codesprite.spriteName ?? "codesprite"}
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-500">
                      {repository.defaultBranch ? repository.defaultBranch : "default branch"}
                    </span>
                  )}
                  {codespriteReady ? (
                    <>
                      <button
                        className="inline-flex h-7 items-center gap-1 rounded border border-white/10 px-2 text-xs text-zinc-300 hover:bg-white/10 hover:text-white disabled:opacity-50"
                        disabled={codesprite.saving || !codesprite.dirty}
                        onClick={handleSaveCodesprite}
                        type="button"
                      >
                        {codesprite.saving ? (
                          <Loader2 className="size-3 animate-spin" />
                        ) : (
                          <Save className="size-3" />
                        )}
                        Save
                      </button>
                      <button
                        className="inline-flex h-7 items-center gap-1 rounded border border-white/10 px-2 text-xs text-zinc-300 hover:bg-white/10 hover:text-white"
                        onClick={handleRefreshCodesprite}
                        type="button"
                      >
                        <RefreshCw className="size-3" />
                        Refresh
                      </button>
                    </>
                  ) : (
                    <button
                      className="inline-flex h-7 items-center gap-1 rounded bg-white px-2 text-xs font-medium text-black hover:bg-zinc-200 disabled:opacity-60"
                      disabled={isBusy}
                      onClick={handleCreateCodesprite}
                      type="button"
                    >
                      {isBusy ? (
                        <Loader2 className="size-3 animate-spin" />
                      ) : (
                        <Server className="size-3" />
                      )}
                      Create codesprite
                    </button>
                  )}
                </div>
              </div>

              {activeContent !== undefined && activePath ? (
                <div className="flex h-[calc(100%-44px)] min-h-0 flex-col">
                  <div className="min-h-0 flex-1">
                    <MonacoEditor
                      beforeMount={defineReplayMonacoTheme}
                      height="100%"
                      language={
                        codespriteReady
                          ? activeLanguage
                          : selectedFile?.isBinary
                            ? "plaintext"
                            : activeLanguage
                      }
                      onChange={codespriteReady ? handleCodespriteContentChange : undefined}
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
                        readOnly: !codespriteReady,
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
                      path={
                        codespriteReady
                          ? `codesprite://${repository.fullName}/${activePath}`
                          : `github://${repository.fullName}/${activePath}`
                      }
                      theme="replay-github-dark"
                      value={activeContent}
                      width="100%"
                    />
                  </div>
                  {codespriteReady && codesprite.entityUrl ? (
                    <div className="h-72 min-h-48 shrink-0">
                      <SpriteTerminalPanel
                        entityUrl={codesprite.entityUrl}
                        projectPathHint={codesprite.projectPathHint}
                        storageKey={repository.fullName}
                      />
                    </div>
                  ) : null}
                </div>
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
      className="h-full"
      model={model}
      style={
        {
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
        } as CSSProperties
      }
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

function textToBase64(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.slice(index, index + chunkSize));
  }
  return window.btoa(binary);
}

function base64ToText(value: string) {
  const binary = window.atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new TextDecoder().decode(bytes);
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
