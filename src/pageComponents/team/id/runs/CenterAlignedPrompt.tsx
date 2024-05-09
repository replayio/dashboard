import { PropsWithChildren } from "react";

export function CenterAlignedPrompt({ children }: PropsWithChildren) {
  return <div className="flex items-center justify-center text-slate-300 h-full">{children}</div>;
}
