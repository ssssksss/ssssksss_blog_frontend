import { isEqual } from "lodash";
import { useEffect, useRef, useState } from "react";
import { StoreApi, useStore } from "zustand";

export function useInitialThenStoreWithSync<T, S>({
  initialData,
  store,
  selector,
  setSelector,
}: {
  initialData: T;
  store: StoreApi<S>;
  selector: (state: S) => T;
  setSelector: (state: S) => (value: T) => void;
}): T {
  const storeValue = useStore(store, selector);
  const setStoreValue = useStore(store, setSelector);

  const isFirstRender = useRef(true);
  const [viewData, setViewData] = useState<T>(initialData);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // 최초 렌더에서 store에 값이 없다면 저장
      if (!isEqual(storeValue, initialData)) {
        setStoreValue(initialData);
      }
      return;
    }

    if (!isEqual(viewData, storeValue)) {
      setViewData(storeValue);
    }
  }, [storeValue, viewData, initialData]);

  return viewData;
}
