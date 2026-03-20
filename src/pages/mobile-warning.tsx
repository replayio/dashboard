import { EmptyLayout } from "@/components/EmptyLayout";
import { ReplayLogo } from "@/components/ReplayLogo";
import { COOKIES } from "@/constants";
import { setCookieValueClient } from "@/utils/cookie";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const onClick = () => {
    setCookieValueClient(COOKIES.mobileWarningDismissed, true);
    router.replace("/");
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <ReplayLogo className="text-neutral-500 min-w-12 min-h-12" />
      <div className="text-xl font-bold">Replay is designed for desktop displays.</div>
      <div className="font-bold underline text-blue-400 cursor-pointer" onClick={onClick}>
        Take me there anyway →
      </div>
    </div>
  );
}

Page.Layout = EmptyLayout;
