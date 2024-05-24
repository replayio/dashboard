import { Code } from "@/components/Code";
import { Icon } from "@/components/Icon";
import { copyText } from "@/utils/copy";
import { MouseEvent, useEffect, useState } from "react";
import type { BundledLanguage } from "shiki";

export function CopyCode({
  className,
  code,
  lang,
}: {
  className?: string;
  code: string;
  lang?: BundledLanguage;
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
        copyText(code);
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
      <Code className={`w-full cursor-pointer ${className}`} code={code} lang={lang} />
      <div className="absolute top-1 right-0 pointer-events-none flex flex-row items-center text-xs">
        {state === "copied" ? (
          <span className="bg-slate-950 px-1 round text-sky-400">Copied</span>
        ) : state === "hover" ? (
          <div className="bg-slate-950 px-1 round">Copy</div>
        ) : (
          <div className="bg-slate-950 px-1 round">
            <Icon className="w-5 h-5" type="copy" />
          </div>
        )}
      </div>
    </div>
  );
}
