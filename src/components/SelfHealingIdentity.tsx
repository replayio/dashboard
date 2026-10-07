import { useContext, useEffect } from "react";
import { SessionContext } from "@/components/SessionContext";
import { selfHealingCapture } from "@/utils/selfHealingCapture";

/** Associates captured Self Healing sessions with the signed-in dashboard user. */
export function SelfHealingIdentity() {
  const { user } = useContext(SessionContext);

  useEffect(() => {
    selfHealingCapture.identify(user ? { id: user.id, name: user.name, email: user.email } : null);
  }, [user]);

  return null;
}
