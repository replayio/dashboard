import { Block } from "@/pageComponents/home/Block";
import documentationImage from "@/pageComponents/home/documentation.png";
import supportImage from "@/pageComponents/home/support.png";
import courseImage from "@/pageComponents/home/course.png";
import blogImage from "@/pageComponents/home/blog.png";

export function HomePage() {
  return (
    <div className="flex items-start justify-start h-full p-2 overflow-auto lg:justify-center lg:items-center">
      {/* This div will be displayed on screens larger than 'md' */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-1 gap-4 border shadow-lg border-slate-700 md:grid-cols-2 lg:grid-cols-2 bg-none rounded-xl lg:bg-slate-800 lg:p-6 lg:gap-6">
          <div className="text-2xl font-medium col-span-full">Home</div>

          <Block
            href="https://docs.replay.io/basics/getting-started/record-your-app"
            title="Documentation"
            imageUrl={documentationImage.src}
          >
            Filled with examples to help you on your way
          </Block>
          <Block href="https://www.replay.io/support" title="Support" imageUrl={supportImage.src}>
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
      {/* This div will be displayed on screens smaller than 'md' */}
      <div className="p-6 mt-6 lg:hidden">
        <ul className="p-0 m-0 space-y-2 list-none">
          <li>
            <a
              href="https://docs.replay.io/basics/getting-started/record-your-app"
              className="text-xl text-white underline"
            >
              Documentation
            </a>
            <div>Filled with examples to help you on your way</div>
          </li>
          <li>
            <a href="https://www.replay.io/support" className="text-xl text-white underline">
              Support
            </a>
            <div>Contact us on Discord, we&apos;re here to help!</div>
          </li>
          <li>
            <a
              href="https://www.youtube.com/playlist?list=PLOHkr6ZaQDlH5M0PZzjVG9ohyqw7avwPa"
              className="text-xl text-white underline"
            >
              Replay Course
            </a>
            <div>Our course on YouTube is great for learning the basics</div>
          </li>
          <li>
            <a href="https://blog.replay.io" className="text-xl text-white underline">
              Replay Blog
            </a>
            <div>See how other teams perform time travel miracles with Replay</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
