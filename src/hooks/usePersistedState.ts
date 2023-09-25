import { useState, useEffect } from "react";

interface UsePersistedStateConfig<T> {
  initialValue: T;
  key: string;
}

export const usePersistedState = <T>({
  key,
  initialValue,
}: UsePersistedStateConfig<T>) => {
  const [state, setState] = useState<T>(() => {
    const value = window.localStorage.getItem(key);
    return value === null ? initialValue : JSON.parse(value);
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  useEffect(() => {
    const storageCb = (e: StorageEvent) => {
      if (e.key !== key) return;
      setState(e.newValue ? JSON.parse(e.newValue) : initialValue);
    };

    window.addEventListener("storage", storageCb);
    return () => window.removeEventListener("storage", storageCb);
  }, [key, initialValue]);

  return [state, setState] as const;
};
