import { Button } from "@/components/Button";
import { ReplayLogo } from "@/components/ReplayLogo";
import Link from "next/link";

export default function TeamNotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-6 text-center p-4">
      <div className="flex flex-row gap-4 items-center">
        <ReplayLogo className="text-slate-500 min-w-12 min-h-12" />
        <div className="text-2xl font-bold">Sorry, you don&apos;t have permission!</div>
      </div>
      <div>Contact an admin if you think you should have access to this team.</div>
      <Link href="/home">
        <Button data-test-id="Button-GoHome" size="large" variant="outline">
          Go home
        </Button>
      </Link>
    </div>
  );
}
