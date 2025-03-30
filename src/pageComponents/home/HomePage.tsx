import { Block } from "@/pageComponents/home/Block";
import blogImage from "@/pageComponents/home/blog.png";
import courseImage from "@/pageComponents/home/course.png";
import documentationImage from "@/pageComponents/home/documentation.png";
import supportImage from "@/pageComponents/home/support.png";

export function HomePage() {
  return (
    <div className="flex items-start justify-start h-full p-6 overflow-auto lg:justify-center lg:items-center">
      <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:p-6 lg:gap-6 lg:shadow-lg bg-none rounded-xl lg:bg-slate-800">
        <div className="hidden text-2xl font-medium col-span-full lg:block">Home</div>

        <Block
          href="https://docs.replay.io/basics/getting-started/record-your-app"
          title="Documentation"
          imageUrl={documentationImage.src}
        >
          Filled with examples to help you on your way
        </Block>
        <Block href="https://www.replay.io/discord" title="Support" imageUrl={supportImage.src}>
          Contact us on Discord, we&apos;re here to help!
        </Block>
        <Block
          href="https://www.youtube.com/playlist?list=PLOHkr6ZaQDlH5M0PZzjVG9ohyqw7avwPa"
          title="Replay Course"
          imageUrl={courseImage.src}
        >
          Our course on YouTube is great for learning the basics
        </Block>
        <Block href="https://blog.replay.io" title="Replay Blog" imageUrl={blogImage.src}>
          See how other teams perform time travel miracles with Replay
        </Block>
      </div>
    </div>
  );
}
