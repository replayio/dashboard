import { InputHTMLAttributes, KeyboardEvent } from "react";

export function TextArea({
  className = "",
  disabled,
  onChange,
  onConfirm,
  onDismiss,
  ...rest
}: Omit<InputHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
  onChange?: (value: string) => void;
  onConfirm?: (value: string) => void;
  onDismiss?: () => void;
}) {
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
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
    <textarea
      className={`resize-none bg-slate-950 text-white px-4 py-2 outline outline-2 outline-transparent focus:outline-sky-500 rounded grow ${className} ${
        disabled ? "opacity-50" : ""
      }`}
      disabled={disabled}
      onChange={(event) => {
        if (onChange) {
          onChange(event.currentTarget.value);
        }
      }}
      onKeyDown={onKeyDown}
      {...rest}
    />
  );
}
