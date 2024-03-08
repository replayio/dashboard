import { ButtonHTMLAttributes } from "react";

export function Button({
  className = "",
  color = "primary",
  disabled,
  variant = "solid",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: "primary" | "secondary";
  variant?: "outline" | "solid";
}) {
  let defaultColorsClassName = "";
  if (disabled) {
    if (variant === "solid") {
      defaultColorsClassName = "bg-gray-500 text-white";
    } else {
      defaultColorsClassName = "border border-gray-500 text-gray-700";
    }
  } else {
    switch (color) {
      case "primary":
        if (variant === "solid") {
          defaultColorsClassName = "bg-sky-500 text-white";
        } else {
          defaultColorsClassName = "border border-sky-500 text-white";
        }
        break;
      case "secondary":
        if (variant === "solid") {
          defaultColorsClassName = "bg-rose-600 text-white";
        } else {
          defaultColorsClassName = "border border-rose-600 text-white";
        }
        break;
    }

    defaultColorsClassName += " cursor-pointer";
  }

  return (
    <button
      className={`rounded px-2 py-1 font-bold ${defaultColorsClassName} ${className}`}
      disabled={disabled}
      {...rest}
    />
  );
}
