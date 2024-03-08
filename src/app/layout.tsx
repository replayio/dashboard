import { LeftNavigation } from "@/components/LeftNavigation";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { PropsWithChildren } from "react";
import "./global.css";

export const metadata = {
  title: "Replay",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <UserProvider>
        <body className="flex h-screen w-screen flex-row bg-slate-900">
          <LeftNavigation />
          <main className="p-4 grow overflow-auto">{children}</main>
        </body>
      </UserProvider>
    </html>
  );
}
