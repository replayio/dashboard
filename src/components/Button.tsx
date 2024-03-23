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
          defaultColorsClassName = "bg-sky-600 hover:bg-sky-700 text-white";
        } else {
          defaultColorsClassName =
            "border border-sky-600 hover:border-sky-700 text-white";
        }
        break;
      case "secondary":
        if (variant === "solid") {
          defaultColorsClassName = "bg-rose-600 hover:bg-rose-700 text-white";
        } else {
          defaultColorsClassName =
            "border border-rose-600 hover:border-rose-700 text-white";
        }
        break;
    }

    defaultColorsClassName += " cursor-pointer";
  }

  return (
    <button
      className={`inline-flex flex-row items-center gap-2 rounded px-2 py-1 font-bold transition outline outline-2 outline-transparent ${defaultColorsClassName} ${className}`}
      disabled={disabled}
      {...rest}
    />
  );
}
