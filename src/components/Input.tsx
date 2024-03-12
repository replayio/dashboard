import { InputHTMLAttributes, KeyboardEvent } from "react";

export function Input({
  className = "",
  disabled,
  onConfirm,
  onDismiss,
  onKeyDown,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  onConfirm?: (value: string) => void;
  onDismiss?: () => void;
}) {
  const onKeyDownWrapper = (event: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(event);
    }

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
      className={`bg-slate-950 text-white px-4 py-2 outline-none rounded grow ${className} ${
        disabled ? "opacity-50" : ""
      }`}
      disabled={disabled}
      onKeyDown={onKeyDownWrapper}
      {...rest}
    />
  );
}
