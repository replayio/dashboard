import { LoginLayout } from "@/components/LoginLayout";
import { VerifyEmailForm } from "@/pageComponents/login/VerifyEmailForm";

export default function Page() {
  return <VerifyEmailForm />;
}

Page.Layout = LoginLayout;
