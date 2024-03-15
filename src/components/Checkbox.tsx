"use client";

import { MouseEvent, ReactNode, useState } from "react";

// This component exists to work around bizarre React behavior
// Something about the context of a dialog causes an <input type="checkbox"> to never change its checked value after initial render
export default function Checkbox({
  checked,
  className = "",
  disabled,
  label,
  onChange: onChangeProp,
}: {
  className?: string;
  checked: boolean;
  disabled?: boolean;
  label: ReactNode;
  onChange: (value: boolean) => void;
}) {
  const [didChange, setDidChange] = useState(false);

  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setDidChange(true);

    onChangeProp(!checked);
  };

  return (
    <label
      className={`flex flex-row items-center gap-1 ${className}`}
      onClick={onClick}
    >
      <input
        autoFocus={didChange}
        defaultChecked={checked}
        disabled={disabled}
        key={"" + checked}
        onClick={onClick}
        type="checkbox"
      />
      {label}
    </label>
  );
}
