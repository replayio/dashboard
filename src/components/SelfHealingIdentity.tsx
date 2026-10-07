import { useContext, useEffect } from "react";
import { SessionContext } from "@/components/SessionContext";
import { getSelfHealingCapture } from "@/utils/selfHealingCapture";

export function SelfHealingIdentity() {
  const { user } = useContext(SessionContext);

  useEffect(() => {
    const capture = getSelfHealingCapture();
    if (!capture || !user) return;
    capture.identify({ id: user.id, name: user.name, email: user.email });
  }, [user]);

  return null;
}
