import { CSSProperties, ForwardedRef, ReactNode, forwardRef } from "react";
import { createPortal } from "react-dom";

type TooltipProps = {
  children: ReactNode;
  className?: string;
  forwardedRef?: ForwardedRef<HTMLDivElement>;
  style?: CSSProperties;
};

function Tooltip({ children, className, forwardedRef, style }: TooltipProps) {
  return createPortal(
    <div
      className={`absolute z-50 bg-accent text-foreground px-2.5 py-1.5 rounded-md text-sm shadow-lg ${className}`}
      style={style}
      ref={forwardedRef}
    >
      {children}
    </div>,
    document.body
  );
}

function TooltipRefForwarder(props: TooltipProps, ref: ForwardedRef<HTMLDivElement>) {
  return <Tooltip forwardedRef={ref} {...props} />;
}

export default forwardRef(TooltipRefForwarder);
