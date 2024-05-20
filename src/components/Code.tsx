import { InputHTMLAttributes } from "react";

export function Code({ className = "", ...rest }: InputHTMLAttributes<HTMLElement>) {
  return (
    <code
      className={`bg-slate-950 text-white px-2 py-1 rounded whitespace-pre text-sm ${className}`}
      {...rest}
    />
  );
}
