import { Block } from "@/pageComponents/home/Block";

export function HomePage() {
  return (
    <div className="flex items-start justify-start h-full p-2 overflow-auto lg:justify-center lg:items-center">
      <div className="grid grid-cols-1 gap-2 shadow-lg md:grid-cols-2 lg:grid-cols-3 bg-none rounded-xl lg:bg-slate-950 lg:p-6 lg:gap-4">
        <div className="text-2xl font-medium col-span-full md:col-span-2 lg:col-span-3">Home</div>
        <Block href="https://docs.replay.io/quickstart" title="Quickstart">
          Record your first replay with{" "}
          <code className="p-1 text-sm text-white rounded bg-slate-800">npx replayio record</code>
        </Block>
        <Block href="/team/new/standard" title="Add a new team">
          Set up a new team to store your replays in one place
        </Block>
        <Block href="/team/new/tests" title="Create Test Suite">
          Use Replay to record Playwright or Cypress tests
        </Block>
        <Block
          href="https://www.youtube.com/playlist?list=PLOHkr6ZaQDlH5M0PZzjVG9ohyqw7avwPa"
          title="Replay Course"
        >
          Our class on YouTube is great for learning the basics
        </Block>
        <Block href="https://www.replay.io/contact" title="Support">
          Contact us on Discord or send us a note
        </Block>
      </div>
    </div>
  );
}
