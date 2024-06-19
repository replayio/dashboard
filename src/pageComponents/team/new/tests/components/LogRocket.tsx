import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { SessionContext } from "@/components/SessionContext";
import { PropsWithChildren, useContext, useLayoutEffect, useState } from "react";

export default function LogRocket({ children }: PropsWithChildren) {
  const { user } = useContext(SessionContext);

  const [initialized, setInitialized] = useState(false);

  useLayoutEffect(() => {
    import("logrocket").then(({ default: API }) => {
      API.init("4sdo4i/replay");
      API.identify(user.id, {
        name: user.name,
        email: user.email,
      });

      setInitialized(true);
    });
  }, [user]);

  return initialized ? children : <LoadingProgressBar />;
}
