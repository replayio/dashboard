import {
  AlertTriangle,
  Circle,
  ExternalLink,
  Globe2,
  Loader2,
  LockKeyhole,
  Plus,
  RefreshCw,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type SpriteTerminalPanelProps = {
  entityUrl: string;
  projectPathHint?: string | null;
  storageKey: string;
};

type TicketResponse = {
  error?: string;
  sessionId?: string;
  spriteName?: string;
  ticket?: string;
};

type CodespriteUrlAuth = "public" | "sprite";

type CodespritePort = {
  host: string | null;
  isLoopbackOnly: boolean;
  line: string;
  pid: number | null;
  port: number;
  process: string | null;
  score: number;
};

type CodespriteService = {
  args: string[];
  cmd: string;
  dir?: string;
  env?: Record<string, string>;
  http_port?: number | null;
  name: string;
  state?: {
    error?: string;
    pid?: number;
    status: string;
  };
};

type PortsResponse = {
  error?: string;
  httpService?: CodespriteService | null;
  ports?: CodespritePort[];
  primaryPort?: number | null;
  servicePort?: number | null;
  services?: CodespriteService[];
  spriteName?: string;
  url?: string | null;
  urlAuth?: CodespriteUrlAuth;
};

type TerminalTab = {
  id: string;
  label: string;
  sessionId: string;
};

type ConnectionState = "connecting" | "connected" | "disconnected" | "error" | "minting";
type PanelView = "ports" | "terminal";

type XtermTerminal = import("@xterm/xterm").Terminal;
type XtermFitAddon = import("@xterm/addon-fit").FitAddon;

const TERMINAL_SESSION_ID_PATTERN = /^[a-zA-Z0-9_-]{1,64}$/;

function terminalWsUrl(ticket: string, cols: number, rows: number) {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const configuredBase = process.env.NEXT_PUBLIC_CODESPRITE_WS_URL?.trim().replace(/\/+$/, "");
  const base = configuredBase
    ? configuredBase.startsWith("http")
      ? `ws${configuredBase.slice(4)}`
      : configuredBase
    : `${protocol}//${window.location.host}`;
  const url = new URL("/api/codesprite/tty", base);
  url.searchParams.set("cols", String(cols));
  url.searchParams.set("rows", String(rows));
  url.searchParams.set("ticket", ticket);
  return url.toString();
}

function defaultTabs(): TerminalTab[] {
  return [{ id: "main", label: "Main", sessionId: "codesprite-main" }];
}

function readStoredTabs(storageKey: string) {
  if (typeof window === "undefined") return defaultTabs();
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as unknown;
    if (!Array.isArray(parsed)) return defaultTabs();
    const tabs = parsed.flatMap(tab => {
      if (!tab || typeof tab !== "object") return [];
      const value = tab as Partial<TerminalTab>;
      if (
        typeof value.id !== "string" ||
        typeof value.label !== "string" ||
        typeof value.sessionId !== "string" ||
        !TERMINAL_SESSION_ID_PATTERN.test(value.sessionId)
      ) {
        return [];
      }
      return [{ id: value.id, label: value.label, sessionId: value.sessionId }];
    });
    return tabs.length ? tabs : defaultTabs();
  } catch {
    return defaultTabs();
  }
}

function randomSuffix() {
  return (
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().replace(/-/g, "")
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`
  ).slice(0, 10);
}

function stateLabel(state: ConnectionState) {
  switch (state) {
    case "connected":
      return "Connected";
    case "connecting":
      return "Connecting";
    case "disconnected":
      return "Disconnected";
    case "error":
      return "Connection failed";
    case "minting":
      return "Preparing terminal";
  }
}

function visibilityLabel(urlAuth: CodespriteUrlAuth | null) {
  return urlAuth === "public" ? "Public" : "Private";
}

function visibilityClassName(urlAuth: CodespriteUrlAuth | null) {
  return urlAuth === "public" ? "text-emerald-300" : "text-zinc-400";
}

function SpriteTerminalSession({
  active,
  entityUrl,
  projectPathHint,
  sessionId,
}: {
  active: boolean;
  entityUrl: string;
  projectPathHint?: string | null;
  sessionId: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<XtermTerminal | null>(null);
  const fitAddonRef = useRef<XtermFitAddon | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const sizeRef = useRef({ cols: 100, rows: 24 });
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<ConnectionState>("minting");
  const [error, setError] = useState<string | null>(null);
  const [spriteName, setSpriteName] = useState<string | null>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | null = null;

    async function boot() {
      if (!containerRef.current) return;

      const [{ Terminal }, { FitAddon }] = await Promise.all([
        import("@xterm/xterm"),
        import("@xterm/addon-fit"),
      ]);
      if (disposed || !containerRef.current) return;

      const terminal = new Terminal({
        allowTransparency: false,
        cols: 100,
        cursorBlink: true,
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
        fontSize: 13,
        lineHeight: 1.25,
        rows: 24,
        theme: {
          background: "#050505",
          foreground: "#d4d4d8",
          cursor: "#f4f4f5",
          selectionBackground: "rgba(34, 211, 238, 0.24)",
        },
      });
      const fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);
      terminal.open(containerRef.current);

      const dataDisposable = terminal.onData(data => {
        const ws = wsRef.current;
        if (ws?.readyState === WebSocket.OPEN) {
          ws.send(new TextEncoder().encode(data));
        }
      });
      const resizeDisposable = terminal.onResize(size => {
        sizeRef.current = size;
        const ws = wsRef.current;
        if (ws?.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ cols: size.cols, rows: size.rows, type: "resize" }));
        }
      });
      const resizeObserver = new ResizeObserver(() => {
        try {
          fitAddon.fit();
          sizeRef.current = { cols: terminal.cols, rows: terminal.rows };
        } catch {
          // The terminal may be hidden during tab switches.
        }
      });
      resizeObserver.observe(containerRef.current);

      terminalRef.current = terminal;
      fitAddonRef.current = fitAddon;
      window.requestAnimationFrame(() => {
        fitAddon.fit();
        sizeRef.current = { cols: terminal.cols, rows: terminal.rows };
        setReady(true);
      });

      cleanup = () => {
        dataDisposable.dispose();
        resizeDisposable.dispose();
        resizeObserver.disconnect();
        fitAddon.dispose();
        terminal.dispose();
        terminalRef.current = null;
        fitAddonRef.current = null;
      };
    }

    void boot().catch(e => {
      setError(e instanceof Error ? e.message : "Unable to initialize terminal.");
      setState("error");
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [sessionId]);

  useEffect(() => {
    if (!active) return;
    const frame = window.requestAnimationFrame(() => {
      fitAddonRef.current?.fit();
      terminalRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [active]);

  useEffect(() => {
    if (!ready) return;

    const abort = new AbortController();
    let closedByEffect = false;
    let ws: WebSocket | null = null;

    async function connect() {
      setState("minting");
      setError(null);
      setSpriteName(null);

      const ticketResponse = await fetch("/api/codesprite/tty-ticket", {
        body: JSON.stringify({
          entityUrl,
          projectPathHint,
          sessionId,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
        signal: abort.signal,
      });
      const payload = (await ticketResponse.json().catch(() => null)) as TicketResponse | null;
      if (!ticketResponse.ok || !payload?.ticket) {
        throw new Error(payload?.error ?? "Unable to create terminal ticket.");
      }

      setSpriteName(payload.spriteName ?? null);
      setState("connecting");

      const { cols, rows } = sizeRef.current;
      ws = new WebSocket(terminalWsUrl(payload.ticket, cols, rows));
      ws.binaryType = "arraybuffer";
      wsRef.current = ws;

      ws.addEventListener("open", () => {
        if (closedByEffect) return;
        setState("connected");
        terminalRef.current?.focus();
      });

      ws.addEventListener("message", event => {
        if (event.data instanceof ArrayBuffer) {
          terminalRef.current?.write(new Uint8Array(event.data));
          return;
        }
        if (typeof event.data === "string") {
          try {
            const parsed = JSON.parse(event.data) as { type?: string };
            if (parsed.type === "terminal-status") return;
          } catch {
            // Not a status frame.
          }
          terminalRef.current?.write(event.data);
        }
      });

      ws.addEventListener("error", () => {
        if (closedByEffect) return;
        setError("The terminal WebSocket failed.");
        setState("error");
      });

      ws.addEventListener("close", () => {
        if (closedByEffect) return;
        setState(current => (current === "error" ? current : "disconnected"));
      });
    }

    void connect().catch(e => {
      if (abort.signal.aborted) return;
      setError(e instanceof Error ? e.message : "Unable to connect terminal.");
      setState("error");
    });

    return () => {
      closedByEffect = true;
      abort.abort();
      ws?.close();
      if (wsRef.current === ws) {
        wsRef.current = null;
      }
    };
  }, [entityUrl, projectPathHint, ready, sessionId]);

  const statusClassName = state === "connected" ? "text-emerald-400" : "text-zinc-500";

  return (
    <div
      aria-hidden={!active}
      className={`absolute inset-0 flex flex-col bg-[#050505] ${
        active ? "visible z-10 opacity-100" : "invisible z-0 opacity-0"
      }`}
    >
      <div className="flex h-8 shrink-0 items-center justify-between gap-3 border-b border-white/10 px-3 text-xs">
        <div className="flex min-w-0 items-center gap-2">
          {state === "minting" || state === "connecting" ? (
            <Loader2 className="size-3 animate-spin text-zinc-500" />
          ) : state === "error" ? (
            <AlertTriangle className="size-3 text-red-400" />
          ) : (
            <Circle className={`size-2 fill-current ${statusClassName}`} />
          )}
          <span className={statusClassName}>{stateLabel(state)}</span>
          <span className="truncate text-zinc-500">tmux:{sessionId}</span>
        </div>
        {spriteName ? <span className="truncate text-zinc-600">{spriteName}</span> : null}
      </div>
      {error ? (
        <div className="border-b border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {error}
        </div>
      ) : null}
      <div ref={containerRef} className="min-h-0 flex-1 overflow-hidden p-2" />
    </div>
  );
}

function CodespritePortsPanel({
  active,
  entityUrl,
  projectPathHint,
}: {
  active: boolean;
  entityUrl: string;
  projectPathHint?: string | null;
}) {
  const [status, setStatus] = useState<"error" | "idle" | "loading" | "ready">("idle");
  const [error, setError] = useState<string | null>(null);
  const [httpService, setHttpService] = useState<CodespriteService | null>(null);
  const [ports, setPorts] = useState<CodespritePort[]>([]);
  const [primaryPort, setPrimaryPort] = useState<number | null>(null);
  const [servicePort, setServicePort] = useState<number | null>(null);
  const [spriteName, setSpriteName] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [urlAuth, setUrlAuth] = useState<CodespriteUrlAuth | null>(null);

  async function loadPorts(
    operation: "exposeService" | "list" | "setUrlAuth" = "list",
    options: { port?: number; urlAuth?: CodespriteUrlAuth } = {}
  ) {
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/codesprite/ports", {
        body: JSON.stringify({
          entityUrl,
          operation,
          port: options.port,
          projectPathHint,
          urlAuth: options.urlAuth,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const payload = (await response.json().catch(() => null)) as PortsResponse | null;
      if (!response.ok || !payload) {
        throw new Error(payload?.error ?? "Unable to load codesprite ports.");
      }

      setHttpService(payload.httpService ?? null);
      setPorts(payload.ports ?? []);
      setPrimaryPort(payload.primaryPort ?? null);
      setServicePort(payload.servicePort ?? null);
      setSpriteName(payload.spriteName ?? null);
      setUrl(payload.url ?? null);
      setUrlAuth(payload.urlAuth ?? "sprite");
      setStatus("ready");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load codesprite ports.");
      setStatus("error");
    }
  }

  useEffect(() => {
    if (active) {
      void loadPorts();
    }
    // Fetching when the tab becomes active is intentional; loadPorts uses current props.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, entityUrl, projectPathHint]);

  const isLoading = status === "loading";
  const hasRunningHttpService = httpService?.state?.status === "running";
  const primaryAddress = url ?? "Sprite URL unavailable";
  const canOpenUrl = Boolean(url && urlAuth === "public" && hasRunningHttpService);
  const serviceStatus = httpService?.state?.status ?? null;

  function togglePublicUrl() {
    if (urlAuth === "public") {
      void loadPorts("setUrlAuth", { urlAuth: "sprite" });
      return;
    }
    void loadPorts("exposeService", { port: primaryPort ?? undefined });
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#050505] text-xs text-zinc-300">
      <div className="flex h-10 shrink-0 items-center justify-between gap-3 border-b border-white/10 px-3">
        <div className="flex min-w-0 items-center gap-2">
          <Globe2 className="size-4 text-zinc-500" />
          <span className="font-medium text-zinc-200">Sprite URL</span>
          <a
            className={`max-w-[46vw] truncate font-mono ${
              canOpenUrl ? "text-cyan-300 hover:text-cyan-200" : "text-zinc-600"
            }`}
            href={canOpenUrl ? url ?? undefined : undefined}
            rel="noreferrer"
            target="_blank"
            title={url ?? undefined}
          >
            {primaryAddress}
          </a>
          <span className={`inline-flex items-center gap-1 ${visibilityClassName(urlAuth)}`}>
            <LockKeyhole className="size-3" />
            {visibilityLabel(urlAuth)}
          </span>
          {spriteName ? <span className="truncate text-zinc-600">{spriteName}</span> : null}
          {serviceStatus ? (
            <span className={hasRunningHttpService ? "text-emerald-300" : "text-amber-300"}>
              service {serviceStatus}
            </span>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {url ? (
            <button
              className="inline-flex h-7 items-center gap-1 rounded border border-white/10 px-2 text-zinc-300 hover:bg-white/10 hover:text-white disabled:opacity-50"
              disabled={!canOpenUrl}
              onClick={() => {
                if (canOpenUrl) window.open(url, "_blank", "noopener,noreferrer");
              }}
              type="button"
            >
              <ExternalLink className="size-3" />
              Open
            </button>
          ) : null}
          <button
            className="inline-flex h-7 items-center gap-1 rounded border border-white/10 px-2 text-zinc-300 hover:bg-white/10 hover:text-white disabled:opacity-50"
            disabled={isLoading}
            onClick={togglePublicUrl}
            type="button"
          >
            {isLoading ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <Globe2 className="size-3" />
            )}
            {urlAuth === "public" ? "Make private" : "Make public"}
          </button>
          <button
            aria-label="Refresh ports"
            className="flex size-7 items-center justify-center rounded text-zinc-400 hover:bg-white/10 hover:text-zinc-100 disabled:opacity-50"
            disabled={isLoading}
            onClick={() => void loadPorts()}
            title="Refresh ports"
            type="button"
          >
            <RefreshCw className={`size-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {error ? (
        <div className="border-b border-red-500/20 bg-red-500/10 px-3 py-2 text-red-300">
          {error}
        </div>
      ) : null}
      {!error && urlAuth === "public" && !hasRunningHttpService ? (
        <div className="flex items-center gap-2 border-b border-amber-500/20 bg-amber-500/10 px-3 py-2 text-amber-200">
          <AlertTriangle className="size-4 shrink-0" />
          <span>
            The Sprite URL is public, but no running HTTP service is backing it. Expose a port as a
            service before opening the URL.
          </span>
        </div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-auto">
        <div className="grid min-w-[880px] grid-cols-[96px_minmax(180px,0.7fr)_minmax(240px,1fr)_minmax(220px,1fr)_120px_130px] border-b border-white/10 bg-[#0c0c0c] px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          <div>Port</div>
          <div>Binding</div>
          <div>Forwarded Address</div>
          <div>Running Process</div>
          <div>Visibility</div>
          <div>Origin</div>
        </div>
        {ports.length ? (
          ports.map(port => {
            const isPrimary = port.port === primaryPort;
            const isServicePort = port.port === servicePort;
            const forwardedUrl = isServicePort && url ? url : null;
            return (
              <div
                className="grid min-w-[880px] grid-cols-[96px_minmax(180px,0.7fr)_minmax(240px,1fr)_minmax(220px,1fr)_120px_130px] items-center border-b border-white/5 px-3 py-2"
                key={port.port}
              >
                <div className="flex items-center gap-2 font-mono text-zinc-100">
                  <Circle className="size-2 fill-emerald-400 text-emerald-400" />
                  {port.port}
                </div>
                <div
                  className={
                    port.isLoopbackOnly ? "font-mono text-zinc-500" : "font-mono text-zinc-300"
                  }
                  title={port.host ?? undefined}
                >
                  {port.host ?? "unknown"}
                </div>
                <div className="min-w-0">
                  {forwardedUrl && urlAuth === "public" && hasRunningHttpService ? (
                    <a
                      className="block truncate font-mono text-cyan-300 hover:text-cyan-200"
                      href={forwardedUrl}
                      rel="noreferrer"
                      target="_blank"
                      title={forwardedUrl}
                    >
                      {forwardedUrl}
                    </a>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="truncate text-zinc-600">
                        {isServicePort
                          ? "Sprite service configured"
                          : "Expose this port as a service"}
                      </span>
                      {!isServicePort ? (
                        <button
                          className="h-6 rounded border border-white/10 px-2 text-zinc-300 hover:bg-white/10 hover:text-white disabled:opacity-50"
                          disabled={isLoading}
                          onClick={() => void loadPorts("exposeService", { port: port.port })}
                          type="button"
                        >
                          Expose
                        </button>
                      ) : null}
                    </div>
                  )}
                </div>
                <div className="truncate text-zinc-400" title={port.line}>
                  {port.process ?? port.line}
                </div>
                <div className={visibilityClassName(urlAuth)}>{visibilityLabel(urlAuth)}</div>
                <div className="text-zinc-500">
                  {isServicePort ? "Service" : isPrimary ? "Primary" : "Detected"}
                </div>
              </div>
            );
          })
        ) : (
          <div className="px-3 py-8 text-center text-zinc-500">
            {isLoading
              ? "Detecting listening ports..."
              : "No listening ports detected. Start a dev server in the terminal, then refresh."}
          </div>
        )}
      </div>
    </div>
  );
}

export function SpriteTerminalPanel({
  entityUrl,
  projectPathHint,
  storageKey,
}: SpriteTerminalPanelProps) {
  const [activeView, setActiveView] = useState<PanelView>("terminal");
  const tabStorageKey = `replay:codesprite-terminals:${storageKey}`;
  const activeStorageKey = `${tabStorageKey}:active`;
  const [tabs, setTabs] = useState<TerminalTab[]>(() => readStoredTabs(tabStorageKey));
  const [activeTabId, setActiveTabId] = useState(() => {
    if (typeof window === "undefined") return "main";
    return window.localStorage.getItem(activeStorageKey) || "main";
  });

  const activeTab = useMemo(
    () => tabs.find(tab => tab.id === activeTabId) ?? tabs[0] ?? null,
    [activeTabId, tabs]
  );

  useEffect(() => {
    window.localStorage.setItem(tabStorageKey, JSON.stringify(tabs));
  }, [tabStorageKey, tabs]);

  useEffect(() => {
    window.localStorage.setItem(activeStorageKey, activeTab?.id ?? "main");
  }, [activeStorageKey, activeTab?.id]);

  function addTerminal() {
    const number = tabs.length + 1;
    const suffix = randomSuffix();
    const tab = {
      id: `term-${suffix}`,
      label: `Term ${number}`,
      sessionId: `codesprite-${number}-${suffix}`,
    };
    setTabs(current => [...current, tab]);
    setActiveTabId(tab.id);
  }

  function closeTerminal(tabId: string) {
    setTabs(current => {
      if (current.length <= 1) return current;
      const next = current.filter(tab => tab.id !== tabId);
      if (activeTabId === tabId) {
        setActiveTabId(next[0]?.id ?? "main");
      }
      return next;
    });
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden border-t border-white/10 bg-[#050505]">
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-white/10 bg-[#101010] pl-2 pr-3">
        <div className="flex shrink-0 items-center gap-1 border-r border-white/10 pr-2">
          <button
            aria-pressed={activeView === "terminal"}
            className={`h-7 rounded px-2 text-xs ${
              activeView === "terminal"
                ? "bg-white/[0.08] text-zinc-100"
                : "text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-200"
            }`}
            onClick={() => setActiveView("terminal")}
            type="button"
          >
            Terminal
          </button>
          <button
            aria-pressed={activeView === "ports"}
            className={`h-7 rounded px-2 text-xs ${
              activeView === "ports"
                ? "bg-white/[0.08] text-zinc-100"
                : "text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-200"
            }`}
            onClick={() => setActiveView("ports")}
            type="button"
          >
            Ports
          </button>
        </div>
        <div
          aria-label="Codesprite terminals"
          className={`min-w-0 flex-1 items-center gap-1 overflow-x-auto ${
            activeView === "terminal" ? "flex" : "hidden"
          }`}
          role="tablist"
        >
          {tabs.map(tab => {
            const isActive = tab.id === activeTab?.id;
            return (
              <div
                className={`group flex h-7 shrink-0 items-center overflow-hidden rounded border text-xs ${
                  isActive
                    ? "border-white/10 bg-white/[0.08] text-zinc-100"
                    : "border-transparent text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-200"
                }`}
                key={tab.id}
              >
                <button
                  aria-label={`${tab.label} terminal tab`}
                  aria-selected={isActive}
                  className="h-full px-3"
                  onClick={() => setActiveTabId(tab.id)}
                  role="tab"
                  type="button"
                >
                  {tab.label}
                </button>
                {tabs.length > 1 ? (
                  <button
                    aria-label={`Close ${tab.label} terminal`}
                    className="mr-1 flex size-5 items-center justify-center rounded text-zinc-500 hover:bg-white/10 hover:text-zinc-100"
                    onClick={() => closeTerminal(tab.id)}
                    type="button"
                  >
                    <X className="size-3" />
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
        <button
          aria-label="New terminal"
          className={`size-7 items-center justify-center rounded text-zinc-400 hover:bg-white/10 hover:text-zinc-100 ${
            activeView === "terminal" ? "flex" : "hidden"
          }`}
          onClick={addTerminal}
          title="New terminal"
          type="button"
        >
          <Plus className="size-4" />
        </button>
      </div>
      <div
        className={`relative min-h-0 flex-1 overflow-hidden ${
          activeView === "terminal" ? "block" : "hidden"
        }`}
      >
        {tabs.map(tab => (
          <SpriteTerminalSession
            active={tab.id === activeTab?.id}
            entityUrl={entityUrl}
            key={tab.sessionId}
            projectPathHint={projectPathHint}
            sessionId={tab.sessionId}
          />
        ))}
      </div>
      {activeView === "ports" ? (
        <CodespritePortsPanel
          active={activeView === "ports"}
          entityUrl={entityUrl}
          projectPathHint={projectPathHint}
        />
      ) : null}
    </div>
  );
}
