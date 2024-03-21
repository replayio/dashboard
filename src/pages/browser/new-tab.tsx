import { EmptyLayout } from "@/components/EmptyLayout";
import { Hoverboard } from "@replayio/overboard";

// TODO Support organization welcome message (if set)
export default function Page() {
  return (
    <div className="flex flex-col gap-4 items-center text-center">
      <div className="w-36 h-36">
        <Hoverboard />
      </div>
      Please navigate to the page you want to record,
      <br />
      then press the blue record button.
    </div>
  );
}

Page.Layout = EmptyLayout;
