import { Icon, IconType } from "@/components/Icon";
import { ButtonHTMLAttributes } from "react";

export function IconButton({
  children,
  className = "",
  iconClassName = "",
  iconType,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  iconClassName?: string;
  iconType: IconType;
}) {
  return (
    <button
      className={`${className} bg-white/10 hover:bg-white/20 p-1 rounded transition`}
      {...rest}
    >
      <Icon
        className={`w-4 h-4 fill-slate-300 ${iconClassName}`}
        type={iconType}
      />
      {children}
    </button>
  );
}
