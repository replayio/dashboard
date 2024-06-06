import { Code } from "@/components/Code";
import { Icon } from "@/components/Icon";
import { copyText } from "@/utils/copy";
import { MouseEvent, useEffect, useState } from "react";
import type { BundledLanguage } from "shiki";

export function CopyCode({
  className,
  code,
  codeToCopy,
  lang,
  size = "normal",
}: {
  className?: string;
  code: string;
  codeToCopy?: string;
  lang?: BundledLanguage;
  size?: "normal" | "small";
}) {
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
        copyText(codeToCopy ?? code);
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
      className="relative flex shrink-0"
      data-test-name="CopyCode"
      onClick={onMouse}
      onMouseEnter={onMouse}
      onMouseLeave={onMouse}
    >
      <Code
        className={`w-full truncate cursor-pointer ${size === "normal" ? "" : "text-xs"} ${className}`}
        code={code}
        lang={lang}
      />
      <div className="absolute right-0 flex flex-row items-center text-xs pointer-events-none top-1">
        {state === "copied" ? (
          <span className="px-1 bg-slate-950 round text-sky-400">Copied</span>
        ) : state === "hover" ? (
          <div className="px-1 bg-slate-950 round">Copy</div>
        ) : (
          <div className="px-1 bg-slate-950 round">
            <Icon className={size === "normal" ? "w-5 h-5" : "w-4 h-4"} type="copy" />
          </div>
        )}
      </div>
    </div>
  );
}
