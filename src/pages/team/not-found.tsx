import { Button } from "@/components/Button";
import { ReplayLogo } from "@/components/ReplayLogo";
import Link from "next/link";

export default function TeamNotFoundPage() {
  const requestAccess = () => {
    // TODO [PRO-518]
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center p-4">
      <div className="flex flex-row gap-4 items-center">
        <ReplayLogo className="text-slate-500 min-w-12 min-h-12" />
        <div className="text-2xl font-bold">Sorry, you don&apos;t have permission!</div>
      </div>
      <div>Maybe you haven&apos;t been invited to this team yet?</div>
      <div className="flex flex-row gap-2">
        <Link href="/home">
          <Button size="large" variant="outline">
            Go home
          </Button>
        </Link>
        <Button onClick={requestAccess} size="large">
          Request access
        </Button>
      </div>
    </div>
  );
}
