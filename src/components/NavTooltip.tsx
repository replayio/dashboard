import { ReactElement, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface NavTooltipProps {
  tooltip: React.ReactNode;
  children: ReactElement;
  side?: "top" | "bottom" | "left" | "right";
}

const SIDE_OFFSET = 8;

/**
 * Tooltip that renders in a portal to avoid being clipped by overflow:hidden parents.
 * Shows on hover, hides on mouse leave.
 */
export function NavTooltip({ tooltip, children, side = "right" }: NavTooltipProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = useCallback(() => {
    const el = triggerRef.current;
    if (!el || typeof document === "undefined") return;
    const rect = el.getBoundingClientRect();
    if (side === "right") {
      setPosition({
        top: rect.top + rect.height / 2,
        left: rect.right + SIDE_OFFSET,
      });
    } else if (side === "left") {
      setPosition({
        top: rect.top + rect.height / 2,
        left: rect.left - SIDE_OFFSET,
      });
    } else if (side === "top") {
      setPosition({
        top: rect.top - SIDE_OFFSET,
        left: rect.left + rect.width / 2,
      });
    } else {
      setPosition({
        top: rect.bottom + SIDE_OFFSET,
        left: rect.left + rect.width / 2,
      });
    }
    setVisible(true);
  }, [side]);

  const handleMouseLeave = useCallback(() => {
    setVisible(false);
  }, []);

  const tooltipContent =
    visible &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        className="pointer-events-none fixed z-[2000] flex items-center opacity-100 transition-opacity duration-150"
        style={
          side === "right"
            ? { top: position.top, left: position.left, transform: "translateY(-50%)" }
            : side === "left"
              ? { top: position.top, left: position.left, transform: "translate(-100%, -50%)" }
              : side === "top"
                ? { top: position.top, left: position.left, transform: "translate(-50%, -100%)" }
                : { top: position.top, left: position.left, transform: "translate(-50%, 0)" }
        }
        aria-hidden
      >
        {side === "right" && (
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 shrink-0"
            style={{
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderRight: "6px solid hsl(var(--card))",
            }}
          />
        )}
        <div className="rounded-md border border-border bg-card px-2.5 py-1.5 text-sm text-foreground shadow-lg max-w-[250px] break-words shrink-0">
          {tooltip}
        </div>
      </div>,
      document.body
    );

  return (
    <div
      ref={triggerRef}
      className="flex w-full min-w-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {tooltipContent}
    </div>
  );
}
