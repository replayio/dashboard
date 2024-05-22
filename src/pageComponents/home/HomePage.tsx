import { Block } from "@/pageComponents/home/Block";

export function HomePage() {
  return (
    <div className="flex items-center justify-center h-full p-2 overflow-auto">
      <div className="flex flex-col gap-4 p-6 pt-2 bg-none shadow-lg w-[827px] rounded-xl lg:bg-slate-950">
        <div className="pt-8 text-3xl font-medium lg:pt-2">Home</div>
        <div className="flex flex-row flex-wrap gap-4">
          <Block href="https://docs.replay.io/quickstart" title="Quickstart">
            Record your first replay with{" "}
            <code className="p-1 text-sm text-white rounded bg-slate-800">npx replayio record</code>
          </Block>
          <Block href="/team/new/standard" title="Add a new team">
            Set up a new team to store your replays in one place
          </Block>
          <Block href="/team/new/tests" title="Create Test Suite">
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
