import { useCallback, useEffect, useRef } from "react";

export const useDebounceSearch = (callback: (search: string) => void, delay = 500) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const debouncedCallback = useCallback(
    (value: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        callback(value);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};
