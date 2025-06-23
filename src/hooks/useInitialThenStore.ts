import { isEqual } from "lodash";
import { useEffect, useRef, useState } from "react";
import { StoreApi, useStore } from "zustand";

/**
 * @param initialData - 서버 또는 props로 받은 초기 데이터
 * @param store - zustand store 자체 (예: useSiteBookmarkStore)
 * @param selector - store에서 가져올 selector 함수
 * @returns viewData - 초기에 initialData를, 이후에는 store 값을 반환
 * @example   
 * const categoryList = useInitialThenStore({
    initialData: props.data,
    store: useSiteBookmarkStore,
    selector: (state) => state.siteBookmarkCategoryList,
  });
 */

export function useInitialThenStore<T, S>({
  initialData,
  store,
  selector,
}: {
  initialData: T;
  store: StoreApi<S>;
  selector: (state: S) => T;
}): T {
  const storeValue = useStore(store, selector);
  const isFirstRender = useRef(true);
  const [viewData, setViewData] = useState<T>(initialData);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!isEqual(viewData, storeValue)) {
      setViewData(storeValue);
    }
  }, [storeValue, viewData]);

  useEffect(() => {
    if (!isEqual(viewData, initialData)) {
      setViewData(initialData);
    }
  }, [initialData, viewData]);

  return viewData;
}
