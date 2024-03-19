import { CliAuthenticationPage } from "@/routes/auth/CliAuthenticationPage";
import { PropsWithChildren } from "react";

export default function Page() {
  return <CliAuthenticationPage />;
}

Page.Layout = function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-screen flex-row bg-slate-900">
      <main className="flex items-center justify-center grow overflow-auto">
        {children}
      </main>
    </div>
  );
};
