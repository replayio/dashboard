import { Button } from "@/components/Button";
import { ReplayLogo } from "@/components/ReplayLogo";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-6 text-center p-4">
      <div className="flex flex-row gap-4 items-center">
        <ReplayLogo className="text-slate-500 min-w-12 min-h-12" />
        <div className="text-2xl font-bold">Page Not Found</div>
      </div>
      <div>The page you are looking for doesn&apos;t exist or has been moved.</div>
      <Link href="/home">
        <Button size="large">Go back home</Button>
      </Link>
    </div>
  );
}
