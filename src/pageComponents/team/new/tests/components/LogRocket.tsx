import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { SessionContext } from "@/components/SessionContext";
import { PropsWithChildren, useContext, useLayoutEffect, useState } from "react";
import type LogRocketType from "logrocket";

export default function LogRocket({ children }: PropsWithChildren) {
  const { user } = useContext(SessionContext);

  const [initialized, setInitialized] = useState(false);

  useLayoutEffect(() => {
    if (process.env.NODE_ENV === "development" || user.isInternal) {
      return;
    }

    let logRocketAPI: typeof LogRocketType;

    import("logrocket").then(module => {
      logRocketAPI = module.default;
      logRocketAPI.init("4sdo4i/replay-dashboard");
      logRocketAPI.identify(user.id, {
        name: user.name,
        email: user.email,
      });

      setInitialized(true);
    });

    return () => {
      // TODO [PRO-657] End session and stop recording
    };
  }, [user]);

  return initialized ? children : <LoadingProgressBar />;
}
