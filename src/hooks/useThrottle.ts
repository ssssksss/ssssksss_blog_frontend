import { useCallback, useRef } from "react";

function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const isThrottled = useRef(false);

  const throttledFunction = useCallback(
    (...args: Parameters<T>) => {
      if (!isThrottled.current) {
        callback(...args);
        isThrottled.current = true;

        setTimeout(() => {
          isThrottled.current = false;
        }, delay);
      }
    },
    [callback, delay],
  );

  return throttledFunction;
}

export default useThrottle;
