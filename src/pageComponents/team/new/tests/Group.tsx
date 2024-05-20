import { PropsWithChildren } from "react";

export function Group({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
