import { PropsWithChildren } from "react";
import classnames from "classnames";

type LayoutProps = {
  classNames?: Parameters<typeof classnames>;
};

export function VerticalLayout({ children, classNames }: PropsWithChildren<LayoutProps>) {
  const outerClassnames = classnames(
    "h-screen w-screen flex flex-row bg-slate-900 text-white",
    classNames
  );
  return (
    <div className={outerClassnames}>
      <main className="flex flex-col  grow overflow-auto h-screen w-screen">{children}</main>
    </div>
  );
}
