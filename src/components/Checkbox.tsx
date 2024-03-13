"use client";

import { MouseEvent, useState } from "react";

// This component exists to work around bizarre React behavior
// Something about the context of a dialog causes an <input type="checkbox"> to never change its checked value after initial render
export default function Checkbox({
  checked,
  className = "",
  label,
  onChange: onChangeProp,
}: {
  className?: string;
  checked: boolean;
  label: string;
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
        key={"" + checked}
        onClick={onClick}
        type="checkbox"
      />
      {label}
    </label>
  );
}
