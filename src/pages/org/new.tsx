import { EmptyLayout } from "@/components/EmptyLayout";
import { CreateOrganizationPage } from "@/routes/org/CreateOrganizationPage";

export default function Page() {
  return <CreateOrganizationPage />;
}

Page.Layout = EmptyLayout;
