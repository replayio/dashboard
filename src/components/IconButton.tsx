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
      className={`${className} flex items-center gap-1 text-xs bg-white/10 p-1 rounded transition ${disabled ? "opacity-50 cursor-default" : "hover:bg-white/20"}`}
      disabled={disabled}
      {...rest}
    >
      <Icon className={`w-4 h-4 fill-slate-300 ${iconClassName}`} type={iconType} />
      {label || children || null}
    </button>
  );
}
