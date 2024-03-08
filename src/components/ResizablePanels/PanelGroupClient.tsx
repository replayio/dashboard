"use client";

import { PanelGroup, PanelGroupProps } from "react-resizable-panels";

export function PanelGroupClient({
  autoSaveId,
  children,
  onLayout: onLayoutProp,
  ...rest
}: PanelGroupProps & {}) {
  const onLayout = (sizes: number[]) => {
    if (autoSaveId) {
      document.cookie = `${autoSaveId}=${JSON.stringify(sizes)}`;
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
