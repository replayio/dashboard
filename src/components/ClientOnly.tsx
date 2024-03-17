import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { PropsWithChildren, useState } from "react";

export function ClientOnly({ children }: PropsWithChildren) {
  const [hasMounted, setHasMounted] = useState(false);
  useIsomorphicLayoutEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted ? children : null;
}
