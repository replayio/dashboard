import { DropDownTrigger } from "@/components/DropDownTrigger";
import assert from "assert";
import { InputHTMLAttributes } from "react";

type Option = {
  label: string;
};

export function Select({
  disabled,
  onChange,
  options,
  value,
}: Omit<InputHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> & {
  onChange: (value: Option) => void;
  options: Option[];
  value: Option;
}) {
  return (
    <div className="relative outline outline-2 outline-transparent focus-within:outline-sky-500 rounded">
      <select
        className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
        disabled={disabled}
        onChange={(event) => {
          const label = event.currentTarget.value;
          const option = options.find((option) => option.label === label);
          assert(option);
          onChange(option);
        }}
      >
        {options.map(({ label }) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>
      <DropDownTrigger
        className="pointer-events-none flex flex-row items-center gap-2 bg-gray-700 px-2 py-1 h-auto rounded"
        label={value.label}
        onClick={noop}
      />
    </div>
  );
}

function noop() {}
