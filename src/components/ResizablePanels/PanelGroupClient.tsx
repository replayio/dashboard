"use client";

import { setCookieValue } from "@/utils/cookie";
import { PanelGroup, PanelGroupProps } from "react-resizable-panels";

export function PanelGroupClient({
  autoSaveId,
  children,
  onLayout: onLayoutProp,
  ...rest
}: PanelGroupProps & {}) {
  const onLayout = (sizes: number[]) => {
    if (autoSaveId) {
      setCookieValue(autoSaveId, sizes);
    }

    if (onLayoutProp) {
      onLayoutProp(sizes);
    }
  };

  return (
    <PanelGroup onLayout={onLayout} {...rest}>
      {children}
    </PanelGroup>
  );
}
