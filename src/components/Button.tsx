import { ButtonHTMLAttributes } from "react";

export  function   Button({
  className = '',
  color = "primary",
  disabled,
  size = "normal",
  variant = "solid",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: "primary" | "secondary";
  size?: "large" | "normal" | "small";
  variant?: "outline" | "solid";
}) {
  let defaultColorsClassName = "";
  if (disabled) {
    switch (variant) {
      case "outline": {
        defaultColorsClassName = "border border-gray-500 text-gray-700";
        break;
      }
      case "solid": {
        defaultColorsClassName = "bg-gray-500 text-white";
        break;
      }
    }
  } else {
    switch (color) {
      case "primary":
        switch (variant) {
          case "outline": {
            defaultColorsClassName = "border border-sky-600 hover:border-sky-700 text-white";
            break;
          }
          case "solid": {
            defaultColorsClassName = "bg-sky-600 hover:bg-sky-700 text-white";
            break;
          }
        }
        break;
      case "secondary":
        switch (variant) {
          case "outline": {
            defaultColorsClassName = "border border-rose-600 hover:border-rose-700 text-white";
            break;
          }
          case "solid": {
            defaultColorsClassName = "bg-rose-600 hover:bg-rose-700 text-white";
            break;
          }
        }
        break;
    }

    defaultColorsClassName += " cursor-pointer";
  }

  let defaultSizeClassName = "";
  switch (size) {
    case "large": {
      defaultSizeClassName = "gap-4 rounded-md px-6 py-3";
      break;
    }
    case "normal": {
      defaultSizeClassName = "gap-2 rounded px-2 py-1";
      break;
    }
    case "small": {
      defaultSizeClassName = "gap-2 rounded px-2 py-1 text-sm";
      break;
    }
  }

  return (
    <button
      className={`font-bold inline-flex flex-row items-center transition outline outline-2 outline-transparent ${defaultColorsClassName} ${defaultSizeClassName} ${className}`}
      disabled={disabled}
      {...rest}
    />
  );
}
