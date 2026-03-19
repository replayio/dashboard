import { getStoredSidebarCollapsed, storeSidebarCollapsed } from "@/lib/sidebarStore";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

type SidebarContextValue = {
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsedState] = useState(false);

  useEffect(() => {
    setIsCollapsedState(getStoredSidebarCollapsed());
  }, []);

  const setCollapsed = useCallback((collapsed: boolean) => {
    setIsCollapsedState(collapsed);
    storeSidebarCollapsed(collapsed);
  }, []);

  const toggleCollapsed = useCallback(() => {
    setIsCollapsedState(prev => {
      const next = !prev;
      storeSidebarCollapsed(next);
      return next;
    });
  }, []);

  const value: SidebarContextValue = { isCollapsed, setCollapsed, toggleCollapsed };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}
