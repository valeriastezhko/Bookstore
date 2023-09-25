import { useEffect, useRef } from "react";

export const useDidUpdate = (
  cb: () => void | (() => void),
  deps: unknown[]
) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      const unmountedCb = cb();
      return unmountedCb?.();
    } else {
      mounted.current = true;
    }
  }, deps);
};
