import { PropsWithChildren } from "react";

export function LoginLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-screen flex flex-row bg-neutral-50 font-sans">
      <main className="flex items-center justify-center grow overflow-auto">{children}</main>
    </div>
  );
}
