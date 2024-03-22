import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useCallback, useRef, useState } from "react";

export default function useDebouncedState<Type>(
  defaultValue: Type,
  callback: (value: Type) => void,
  delay = 500
): [value: Type, setState: (value: Type) => void] {
  const [state, setState] = useState<Type>(defaultValue);

  const mutableValuesRef = useRef<{
    callback: (value: Type) => void;
    delay: number;
    timeout: NodeJS.Timeout | undefined;
  }>({
    callback,
    delay,
    timeout: undefined,
  });

  useIsomorphicLayoutEffect(() => {
    mutableValuesRef.current.callback = callback;
    mutableValuesRef.current.delay = delay;
  });

  const setValueWrapper = useCallback((updated: Type) => {
    setState(updated);

    const { delay, timeout } = mutableValuesRef.current;

    if (timeout) {
      clearTimeout(timeout);
    }

    mutableValuesRef.current.timeout = setTimeout(() => {
      const { callback } = mutableValuesRef.current;

      callback(updated);
    }, delay);
  }, []);

  return [state, setValueWrapper];
}
