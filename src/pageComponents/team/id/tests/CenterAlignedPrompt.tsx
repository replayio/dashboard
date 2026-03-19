import { PropsWithChildren } from "react";

export function CenterAlignedPrompt({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-center text-neutral-300 h-full text-center">
      {children}
    </div>
  );
}
