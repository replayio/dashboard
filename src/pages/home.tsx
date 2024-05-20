import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { HomePage } from "@/pageComponents/home/HomePage";
import { DefaultLayout } from "@/components/layout/DefaultLayout";

export default function Page() {
  useSyncDefaultWorkspace();

  return <HomePage />;
}

Page.Layout = DefaultLayout;
