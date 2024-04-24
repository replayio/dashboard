import { Icon, IconType } from "@/components/Icon";
import { ButtonHTMLAttributes } from "react";

export function IconButton({
  children,
  className = "",
  disabled,
  iconClassName = "",
  iconType,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  iconClassName?: string;
  iconType: IconType;
}) {
  return (
    <button
      className={`${className} bg-white/10 p-1 rounded transition ${disabled ? "opacity-50 cursor-default" : "hover:bg-white/20"}`}
      disabled={disabled}
      {...rest}
    >
      <Icon className={`w-4 h-4 fill-slate-300 ${iconClassName}`} type={iconType} />
      {children}
    </button>
  );
}
