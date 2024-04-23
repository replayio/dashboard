import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { localStorageGetItem, localStorageSetItem } from "@/utils/localStorage";
import { Dispatch, SetStateAction, useRef, useState } from "react";

export default function useLocalStorage<Type>(
  key: string,
  defaultValue: Type
): [value: Type, setValue: Dispatch<SetStateAction<Type>>] {
  const [value, setValue] = useState<Type>(() => {
    const storedValue = localStorageGetItem(key);
    if (storedValue != null) {
      try {
        return JSON.parse(storedValue) as Type;
      } catch (error) {}
    }

    return defaultValue;
  });

  const committedValuesRef = useRef<{
    prevValue: string | null;
    value: string;
  }>({
    prevValue: null,
    value: JSON.stringify(value),
  });
  useIsomorphicLayoutEffect(() => {
    committedValuesRef.current.prevValue = committedValuesRef.current.value;
    committedValuesRef.current.value = JSON.stringify(value);
  });

  // Sync changes from local storage
  useIsomorphicLayoutEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (key === event.key && event.newValue && event.newValue !== JSON.stringify(value)) {
        setValue(JSON.parse(event.newValue) as any);
      }
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, [key, value]);

  // Sync changes to local storage
  useIsomorphicLayoutEffect(() => {
    window.dispatchEvent(
      new StorageEvent("storage", {
        key,
        newValue: committedValuesRef.current.value || "",
        oldValue: committedValuesRef.current.prevValue || "",
      })
    );

    localStorageSetItem(key, committedValuesRef.current.value);
  }, [key, value]);

  return [value, setValue];
}
