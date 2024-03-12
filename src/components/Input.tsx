import { InputHTMLAttributes } from "react";

export function Input({
  className = "",
  disabled,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`bg-slate-950 text-white px-4 py-2 outline-none rounded grow ${className} ${
        disabled ? "opacity-50" : ""
      }`}
      disabled={disabled}
      {...rest}
    />
  );
}
