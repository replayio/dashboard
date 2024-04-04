import { EmptyLayout } from "@/components/EmptyLayout";
import { Message } from "@/components/Message";
import { ReplayLogo } from "@/components/ReplayLogo";
import React from "react";

export default function Page() {
  return (
    <Message className="max-w-96 p-8 gap-8 text-center">
      <ReplayLogo className="text-white min-w-20 min-h-20" />
      <div className="font-bold text-xl">
        Authentication Complete
      </div>
      <div>
        You have successfully logged in. You may close this window.
      </div>
    </Message>
  );
};

Page.Layout = EmptyLayout;
