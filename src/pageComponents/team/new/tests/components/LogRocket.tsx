import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { SessionContext } from "@/components/SessionContext";
import type LogRocketType from "logrocket";
import { PropsWithChildren, useContext, useLayoutEffect, useState } from "react";

export default function LogRocket({ children }: PropsWithChildren) {
  const { user } = useContext(SessionContext);

  const [initialized, setInitialized] = useState(false);

  const { email, id, isInternal, name } = user;

  useLayoutEffect(() => {
    if (process.env.NODE_ENV === "development" || isInternal) {
      return;
    }

    let logRocketAPI: typeof LogRocketType;

    import("logrocket").then(module => {
      logRocketAPI = module.default;
      logRocketAPI.init("4sdo4i/replay-dashboard", {
        dom: {
          textSanitizer: true,
        },
      });
      logRocketAPI.identify(id, {
        email,
        name,
      });

      setInitialized(true);
    });

    return () => {
      if (logRocketAPI) {
        // Hidden API recommended to us by Matt Arbesfeld at LogRocket
        (logRocketAPI as any).uninstall();
      }
    };
  }, [email, id, isInternal, name]);

  return initialized ? children : <LoadingProgressBar />;
}
