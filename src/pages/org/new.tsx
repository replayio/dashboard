import { CreateOrganizationPage } from "@/routes/org/CreateOrganizationPage";
import { PropsWithChildren } from "react";

export default function Page() {
  return <CreateOrganizationPage />;
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
