import { PropsWithChildren } from "react";

export function Group({ children }: PropsWithChildren) {
  return <div className="flex flex-col align-start gap-2">{children}</div>;
}
