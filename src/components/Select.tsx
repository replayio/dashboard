import { DropDownTrigger } from "@/components/DropDownTrigger";
import assert from "assert";
import { InputHTMLAttributes } from "react";

type Option = {
  label: string;
};

export function Select<Type extends Option>({
  className,
  disabled,
  onChange,
  options,
  placeholder,
  value,
}: Omit<InputHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> & {
  className?: string;
  onChange: (value: Type) => void;
  options: Type[];
  placeholder?: string;
  value?: Type | null;
}) {
  return (
    <div
      className={`relative outline outline-2 outline-transparent focus-within:outline-sky-500 rounded ${className}`}
    >
      <select
        className={`opacity-0 absolute top-0 left-0 w-full h-full ${
          disabled ? "pointer-events-none" : "cursor-pointer"
        }`}
        disabled={disabled}
        onChange={(event) => {
          const label = event.currentTarget.value;
          const option = options.find((option) => option.label === label);
          assert(option);
          onChange(option);
        }}
        value={value?.label}
      >
        {options.map(({ label }) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>
      <DropDownTrigger
        className={`pointer-events-none h-auto ${
          !value?.label ? "text-slate-500" : "text-white"
        }`}
        disabled={disabled}
        label={value?.label ?? placeholder ?? ""}
        onClick={noop}
        tabIndex={-1}
      />
    </div>
  );
}

function noop() {}
