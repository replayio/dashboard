import { ButtonHTMLAttributes } from "react";

export function Button({
  className = "",
  color = "primary",
  disabled,
  size = "normal",
  variant = "solid",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: "primary" | "secondary";
  size?: "large" | "normal" | "small";
  variant?: "outline" | "solid" | "ghost";
}) {
  let colorClassName = "";
  if (disabled) {
    switch (variant) {
      case "outline": {
        colorClassName = "border border-input text-muted-foreground";
        break;
      }
      case "ghost": {
        colorClassName = "text-muted-foreground";
        break;
      }
      case "solid": {
        colorClassName = "bg-muted text-muted-foreground";
        break;
      }
    }
  } else {
    switch (color) {
      case "primary":
        switch (variant) {
          case "outline": {
            colorClassName =
              "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
            break;
          }
          case "ghost": {
            colorClassName = "hover:bg-accent hover:text-accent-foreground";
            break;
          }
          case "solid": {
            colorClassName = "bg-primary text-primary-foreground hover:bg-primary/90";
            break;
          }
        }
        break;
      case "secondary":
        switch (variant) {
          case "outline": {
            colorClassName =
              "border border-destructive/50 text-destructive hover:bg-destructive/10";
            break;
          }
          case "ghost": {
            colorClassName = "text-destructive hover:bg-destructive/10";
            break;
          }
          case "solid": {
            colorClassName = "bg-destructive text-destructive-foreground hover:bg-destructive/90";
            break;
          }
        }
        break;
    }

    colorClassName += " cursor-pointer";
  }

  let sizeClassName = "";
  switch (size) {
    case "large": {
      sizeClassName = "gap-4 rounded-md px-6 py-3";
      break;
    }
    case "normal": {
      sizeClassName = "gap-2 rounded-md px-4 py-2";
      break;
    }
    case "small": {
      sizeClassName = "gap-2 rounded-md px-3 py-1.5 text-sm";
      break;
    }
  }

  return (
    <button
      className={`font-medium inline-flex flex-row items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 ${colorClassName} ${sizeClassName} ${className}`}
      disabled={disabled}
      {...rest}
    />
  );
}
