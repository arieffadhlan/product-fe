import type { Ref } from "react";

export function mergeRefs<T = any>(...refs: Array<Ref<T> | undefined>): Ref<T> {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
