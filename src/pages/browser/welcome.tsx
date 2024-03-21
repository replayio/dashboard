import { Button } from "@/components/Button";
import { EmptyLayout } from "@/components/EmptyLayout";
import { ReplayLogo } from "@/components/ReplayLogo";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const onClick = () => {
    router.push("/browser/choose-role");
  };

  return (
    <div className="bg-slate-800 text-white flex flex-col gap-4 items-center p-4 rounded-md min-w-96">
      <ReplayLogo className="min-w-16 min-h-16" />
      <div className="font-bold text-2xl">Welcome to Replay</div>
      <div className="flex flex-row gap-2">
        <Button onClick={onClick}>Let&apos;s get started!</Button>
      </div>
    </div>
  );
}

Page.Layout = EmptyLayout;
