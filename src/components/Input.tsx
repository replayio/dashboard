import { InputHTMLAttributes, KeyboardEvent } from "react";

export function Input({
  className = "",
  disabled,
  onChange,
  onConfirm,
  onDismiss,
  onKeyDown,
  ...rest
}: Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  onChange?: (value: string) => void;
  onConfirm?: (value: string) => void;
  onDismiss?: () => void;
}) {
  const onKeyDownWrapper = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "Enter":
        if (onConfirm) {
          onConfirm(event.currentTarget.value);
        }
        break;
      case "Escape":
        if (onDismiss) {
          onDismiss();
        }
        break;
    }
  };

  return (
    <input
      className={`block w-full min-w-0 rounded-md border border-input bg-background text-foreground px-3 py-2 text-sm placeholder:text-muted-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:pointer-events-none disabled:opacity-50 grow ${className}`}
      disabled={disabled}
      onChange={event => {
        if (onChange) {
          onChange(event.currentTarget.value);
        }
      }}
      onKeyDown={onKeyDownWrapper}
      {...rest}
    />
  );
}
