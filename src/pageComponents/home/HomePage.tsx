import { Block } from "@/pageComponents/home/Block";

export function HomePage() {
  return (
    <div className="h-full flex items-start p-2 overflow-auto">
      <div className="rounded bg-slate-800 p-4 pt-2 inline-flex flex-col gap-4 max-w-full">
        <div className="text-2xl">Home</div>
        <div className="inline-flex flex-row flex-wrap gap-4 max-w-full">
          <Block href="https://docs.replay.io/quickstart" title="Quickstart">
            Create your own replay with{" "}
            <code className="bg-slate-950 rounded px-2 py-1 text-white text-sm">
              npx replayio@latest
            </code>
          </Block>
          <Block href="/team/new/standard" title="Add a new team">
            Set up a new team to store your replays in one place
          </Block>
          <Block href="/team/new/tests" title="Test Suites">
            Use Replay to record Playwright or Cypress e2e tests
          </Block>
          <Block
            href="https://www.youtube.com/playlist?list=PLOHkr6ZaQDlH5M0PZzjVG9ohyqw7avwPa"
            title="Replay Course"
          >
            Learn the steps to get rolling through our class on YouTube
          </Block>
          <Block href="https://www.replay.io/contact" title="Support">
            Contact us on Discord or send us a note
          </Block>
        </div>
      </div>
    </div>
  );
}
