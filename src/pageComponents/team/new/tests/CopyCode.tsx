import { Code } from "@/components/Code";
import { Icon } from "@/components/Icon";
import { copyText } from "@/utils/copy";
import { MouseEvent, useEffect, useState } from "react";

export function CopyCode({ text }: { text: string }) {
  const [state, setState] = useState<"hover" | "copied" | undefined>();

  const onMouse = (event: MouseEvent<HTMLDivElement>) => {
    if (state === "copied") {
      return;
    }

    switch (event.type) {
      case "mouseenter":
        setState("hover");
        break;
      case "mouseleave":
        setState(undefined);
        break;
      case "click":
        copyText(text);
        setState("copied");
        break;
    }
  };

  useEffect(() => {
    if (state === "copied") {
      const id = setTimeout(() => {
        setState(undefined);
      }, 2_500);
      return () => {
        clearTimeout(id);
      };
    }
  }, [state]);

  return (
    <div
      className="flex relative"
      data-test-name="CopyCode"
      onClick={onMouse}
      onMouseEnter={onMouse}
      onMouseLeave={onMouse}
    >
      <Code className="w-full hover:text-blue-400 cursor-pointer">{text}</Code>
      <div className="absolute top-1 right-1 pointer-events-none flex flex-row items-center text-xs">
        {state === "copied" ? (
          <span className="bg-slate-950 px-1 round text-blue-400">Copied</span>
        ) : state === "hover" ? (
          <div className="bg-slate-950 px-1 round">Copy</div>
        ) : (
          <Icon className="w-5 h-5" type="copy" />
        )}
      </div>
    </div>
  );
}
