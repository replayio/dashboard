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
      className={`bg-slate-950 text-white px-2 py-1 outline outline-2 outline-transparent placeholder:text-slate-500 focus:outline-sky-500 rounded grow ${className} ${
        disabled ? "opacity-50" : ""
      }`}
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
