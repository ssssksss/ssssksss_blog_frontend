import useToastifyStore, {
  useToastifyStoreType,
} from 'src/store/toastifyStore';
import useAuthStore, { useUserStoreType } from 'src/store/userStore';
import { IFetchHandlerProps } from '../@types/api/fetchHandler';

// 추가 작업을 위한 고차 함수
function withPostFetchAction(
  fetchFn: (props: IFetchHandlerProps) => Promise<any>,
  postAction?: (response: any) => void, // fetch가 끝난 후 실행할 콜백
) {
  return async (props: IFetchHandlerProps) => {
    try {
      const result = await fetchFn(props);

      // fetchHandler 후 실행할 추가 작업 (성공 시)
      if (postAction) {
        postAction(result);
      }

      return result;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };
}

export function useFetchHandler() {
  const toastifyStore = useToastifyStore() as useToastifyStoreType;
  const userStore = useAuthStore() as useUserStoreType;

  const baseFetchHandler = async ({
    accessToken,
    refreshToken,
    url,
    cache,
    contentType,
    next,
    bodyData,
    isRefreshNeeded = true,
    method = 'GET',
    retries = 1,
    credentials = false,
    errorStatusCodeAndHandler = {},
  }: IFetchHandlerProps): Promise<any> => {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': contentType || 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(credentials ? { 'Access-Control-Allow-Origin': '*' } : {}),
      },
      credentials: credentials ? 'include' : 'omit',
      body: bodyData ? JSON.stringify(bodyData) : null,
      cache: cache || 'no-store',
    });

    if (response.status === 401 && isRefreshNeeded && retries > 0) {
      const response1 = await fetch(`/api/user/accessToken`);
      const data = await response1.json();
      console.log("useFetchHandler.ts 파일 : ",data);
      userStore.setUser({ accessToken: data.accessToken });

      return await baseFetchHandler({
        accessToken: data.accessToken,
        refreshToken,
        url,
        cache,
        contentType,
        next,
        bodyData,
        isRefreshNeeded,
        method,
        retries: retries - 1,
        credentials: true,
      });
    }

    const result = await response.json();
    console.log("useFetchHandler.ts 파일 : 여기" , result);

    if (result.statusCode === 200) {
      toastifyStore.setToastify({ type: 'success', message: result.msg });
    } else if (result.statusCode >= 400) {
      toastifyStore.setToastify({ type: 'error', message: result.msg });
    }

    return result;
  };

  // 고차 함수로 fetchHandler에 후속 작업을 추가
  const fetchHandler = (
    props: IFetchHandlerProps,
    postAction?: (response: any) => void,
  ) => withPostFetchAction(baseFetchHandler, postAction)(props);

  return { fetchHandler, toastifyStore, userStore };
}
