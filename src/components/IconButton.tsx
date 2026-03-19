import { Icon, IconType } from "@/components/Icon";
import { ButtonHTMLAttributes } from "react";

export function IconButton({
  children,
  className = "",
  disabled,
  iconClassName = "",
  iconType,
  label,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  iconClassName?: string;
  iconType: IconType;
  label?: string;
}) {
  return (
    <button
      className={`${className} flex items-center gap-1 text-xs text-muted-foreground bg-muted p-1.5 rounded-md transition-all duration-200 ${disabled ? "opacity-50 cursor-default" : "hover:bg-accent hover:text-foreground cursor-pointer"}`}
      disabled={disabled}
      {...rest}
    >
      <Icon className={`w-4 h-4 ${iconClassName}`} type={iconType} />
      {label || children || null}
    </button>
  );
}
