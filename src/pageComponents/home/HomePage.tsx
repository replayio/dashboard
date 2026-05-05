import { ResourceLink } from "@/pageComponents/home/ResourceLink";

export function HomePage() {
  return (
    <div className="flex h-full flex-col overflow-auto p-6 lg:p-10">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground lg:text-3xl">Home</h1>
          <p className="mt-1 text-base text-muted-foreground">
            Resources to help you get the most out of Replay
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <ResourceLink
            href="https://docs.replay.io/basics/getting-started/record-your-playwright-tests"
            iconType="test-suite"
            title="Record your Playwright tests"
          >
            Capture every CI run in the Replay browser and time-travel through failures
          </ResourceLink>
          <ResourceLink
            href="https://docs.replay.io/basics/replay-mcp/quickstart"
            iconType="folder"
            title="Replay MCP Quickstart"
          >
            Connect Cursor, Claude Code, and other agents to real runtime from your recordings
          </ResourceLink>
          <ResourceLink
            href="https://chromewebstore.google.com/detail/replay-debugger/lkbmpddckbjbfaekcjacjgpehgaaijhh"
            iconType="recording-graphic-browser"
            title="Replay Chrome extension"
          >
            Record bugs straight from the browser — no CLI or test runner required
          </ResourceLink>
          <ResourceLink href="https://www.replay.io/discord" iconType="support" title="Support">
            Contact us on Discord, we&apos;re here to help!
          </ResourceLink>
          <ResourceLink href="https://blog.replay.io" iconType="create" title="Replay Blog">
            See how other teams perform time travel miracles with Replay
          </ResourceLink>
        </div>
      </div>
    </div>
  );
}
